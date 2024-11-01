package test

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	maploader "artyomliou/xenoblast-backend/internal/service/game_service/map_loader"
	"artyomliou/xenoblast-backend/internal/service/http_service"
	"artyomliou/xenoblast-backend/internal/service/websocket_service"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"testing"
	"time"

	"github.com/gorilla/websocket"
	"github.com/stretchr/testify/assert"
	"google.golang.org/protobuf/proto"
)

type frontendState int32

const (
	stateInit frontendState = iota
	stateMainMenu
	stateWaitingRoomInit
	stateWaitingRoomEnrolled
	stateWaitingRoomNewMatch
	stateWaitingRoomWaitingReady
	stateWaitingRoomReady
	stateGameCountdown
	stateGamePlaying
	stateGameGameover
)

type frontendPlayer struct {
	ctx           context.Context
	newStateQueue chan frontendState
	state         frontendState
	errCh         chan error
	completeCh    chan bool
	logger        *log.Logger

	nickname       string
	apiKey         string
	userId         int32
	gameId         int32
	countdownEndAt int64
	conn           *websocket.Conn
}

func newFrontendPlayer(ctx context.Context, nickname string) *frontendPlayer {
	return &frontendPlayer{
		ctx:           ctx,
		newStateQueue: make(chan frontendState, 1),
		state:         stateInit,
		errCh:         make(chan error),
		completeCh:    make(chan bool),
		logger:        log.New(os.Stdout, fmt.Sprintf("%s: ", nickname), log.LstdFlags),
		nickname:      nickname,
	}
}

func (player *frontendPlayer) Run(t *testing.T) {
	for {
		select {
		case <-player.ctx.Done():
			player.logger.Printf("terminated")
			return

		case newState := <-player.newStateQueue:
			player.state = newState
			player.logger.Printf("new state: %d", newState)

			switch newState {
			case stateMainMenu:
				player.sendRegisterOverHttp(t)
				player.newStateQueue <- stateWaitingRoomInit

			case stateWaitingRoomInit:
				player.startWebsocketConnection(t)
				player.sendEnrollMatchmakingOverHttp(t)
				player.newStateQueue <- stateWaitingRoomEnrolled

			case stateWaitingRoomEnrolled:
				player.sendStartSubscribeOverWebsocket(t)
				player.receiveNewMatchFromWebsocket(t)
				player.newStateQueue <- stateWaitingRoomNewMatch

			case stateWaitingRoomNewMatch:
				player.receiveWaitingReadyFromWebsocket(t)
				player.newStateQueue <- stateWaitingRoomWaitingReady

			case stateWaitingRoomWaitingReady:
				player.sendGetGameInfoOverHttp(t)
				player.sendPlayerReadyOverWebsocket(t)
				player.newStateQueue <- stateWaitingRoomReady

			case stateWaitingRoomReady:
				player.receiveCountdownFromWebsocket(t)
				player.newStateQueue <- stateGameCountdown

			case stateGameCountdown:
				player.receivePlayingFromWebsocket(t)
				player.newStateQueue <- stateGamePlaying

			case stateGamePlaying:
				player.sendPlayerMoveOverWebsocket(t)
				player.receivePlayerMovedFromWebsocket(t)
				player.completeCh <- true
				player.logger.Println("successfully exit")
				return
			}
		}
	}
}

func (player *frontendPlayer) sendRegisterOverHttp(t *testing.T) {
	body := map[string]any{
		"nickname": player.nickname,
	}
	respBytes, err := player.sendHttpRequest(http.MethodPost, "api/auth/register", body)
	assert.NoError(t, err)

	resp := &pkg_proto.HttpApiRegisterResponse{}
	err = json.Unmarshal(respBytes, resp)
	assert.NoError(t, err)
	player.apiKey = resp.ApiKey
	player.userId = resp.UserId
}

func (player *frontendPlayer) startWebsocketConnection(t *testing.T) {
	conn, _, err := websocket.DefaultDialer.DialContext(player.ctx, fmt.Sprintf("ws://%s/%s?api_key=%s", websocket_service.HttpServerAddr, "ws/", player.apiKey), nil)
	assert.NoError(t, err)
	player.conn = conn
}

func (player *frontendPlayer) sendEnrollMatchmakingOverHttp(t *testing.T) {
	body := map[string]any{
		"api_key": player.apiKey,
	}
	_, err := player.sendHttpRequest(http.MethodPost, "api/matchmaking/enroll", body)
	assert.NoError(t, err)
}

func (player *frontendPlayer) sendStartSubscribeOverWebsocket(t *testing.T) {
	sendMsg := &pkg_proto.Event{
		Type:      pkg_proto.EventType_SubscribeNewMatch,
		Timestamp: time.Now().Unix(),
	}
	sendMsgBytes, err := proto.Marshal(sendMsg)
	assert.NoError(t, err)
	err = player.conn.WriteMessage(websocket.BinaryMessage, sendMsgBytes)
	assert.NoError(t, err)
}

func (player *frontendPlayer) receiveNewMatchFromWebsocket(t *testing.T) {
	_, msg, err := player.conn.ReadMessage()
	assert.NoError(t, err)

	event := &pkg_proto.Event{}
	err = proto.Unmarshal(msg, event)
	assert.NoError(t, err)
	assert.Equal(t, pkg_proto.EventType_NewMatch, event.Type)
	data := event.GetNewMatch()
	assert.NotNil(t, data)
	assert.Contains(t, data.Players, player.userId)

	player.gameId = event.GameId
}

func (player *frontendPlayer) receiveWaitingReadyFromWebsocket(t *testing.T) {
	_, msg, err := player.conn.ReadMessage()
	assert.NoError(t, err)

	event := &pkg_proto.Event{}
	err = proto.Unmarshal(msg, event)
	assert.NoError(t, err)
	assert.Equal(t, pkg_proto.EventType_StateWaitingReady, event.Type)
}

func (player *frontendPlayer) sendGetGameInfoOverHttp(t *testing.T) {
	body := map[string]any{
		"api_key": player.apiKey,
		"game_id": player.gameId,
	}
	protobufBytes, err := player.sendHttpRequest(http.MethodPost, "api/game/get_game_info", body)
	assert.NoError(t, err)

	resp := &pkg_proto.GetGameInfoResponse{}
	err = proto.Unmarshal(protobufBytes, resp)
	assert.NoError(t, err)

	assert.EqualValues(t, player.gameId, resp.GameId)
	assert.EqualValues(t, maploader.MapWidth, resp.MapWidth)
	assert.EqualValues(t, maploader.MapHeight, resp.MapHeight)

	respPlayerIds := []int32{}
	for _, player := range resp.Players {
		respPlayerIds = append(respPlayerIds, player.UserId)
	}
	assert.Contains(t, respPlayerIds, player.userId)

	assert.EqualValues(t, maploader.MapWidth*maploader.MapHeight, len(resp.Tiles))
	assert.EqualValues(t, pkg_proto.GameState_WaitingReady, resp.State)
}

func (player *frontendPlayer) sendPlayerReadyOverWebsocket(t *testing.T) {
	msg := &pkg_proto.Event{
		Type:      pkg_proto.EventType_PlayerReady,
		Timestamp: time.Now().Unix(),
		GameId:    player.gameId,
		Data: &pkg_proto.Event_PlayerReady{
			PlayerReady: &pkg_proto.PlayerReadyData{
				UserId: player.userId,
			},
		},
	}
	msgBytes, err := proto.Marshal(msg)
	assert.NoError(t, err)
	err = player.conn.WriteMessage(websocket.BinaryMessage, msgBytes)
	assert.NoError(t, err)
}

func (player *frontendPlayer) receiveCountdownFromWebsocket(t *testing.T) {
	_, msg, err := player.conn.ReadMessage()
	assert.NoError(t, err)

	event := &pkg_proto.Event{}
	err = proto.Unmarshal(msg, event)
	assert.NoError(t, err)
	assert.Equal(t, pkg_proto.EventType_StateCountdown, event.Type)
	data := event.GetCountdown()
	assert.NotNil(t, data)
	assert.Greater(t, data.EndTs, time.Now().Unix())

	player.countdownEndAt = data.EndTs
}

func (player *frontendPlayer) receivePlayingFromWebsocket(t *testing.T) {
	<-time.After(time.Until(time.Unix(player.countdownEndAt, 0)))

	_, msg, err := player.conn.ReadMessage()
	assert.NoError(t, err)

	event := &pkg_proto.Event{}
	err = proto.Unmarshal(msg, event)
	assert.NoError(t, err)
	assert.Equal(t, pkg_proto.EventType_StatePlaying, event.Type)
}

func (player *frontendPlayer) sendPlayerMoveOverWebsocket(t *testing.T) {
	msg := &pkg_proto.Event{
		Type:      pkg_proto.EventType_PlayerMove,
		Timestamp: time.Now().Unix(),
		GameId:    player.gameId,
		Data: &pkg_proto.Event_PlayerMove{
			PlayerMove: &pkg_proto.PlayerMoveData{
				UserId: player.userId,
				X:      1,
				Y:      1,
				PixelX: 1,
				PixelY: 1,
			},
		},
	}
	msgBytes, err := proto.Marshal(msg)
	assert.NoError(t, err)
	err = player.conn.WriteMessage(websocket.BinaryMessage, msgBytes)
	assert.NoError(t, err)
}

func (player *frontendPlayer) receivePlayerMovedFromWebsocket(t *testing.T) {
	_, msg, err := player.conn.ReadMessage()
	assert.NoError(t, err)

	event := &pkg_proto.Event{}
	err = proto.Unmarshal(msg, event)
	assert.NoError(t, err)
	assert.Equal(t, pkg_proto.EventType_PlayerMoved, event.Type)

	data := event.GetPlayerMoved()
	assert.Equal(t, 1, int(data.X))
	assert.Equal(t, 1, int(data.Y))
	assert.Equal(t, 1, int(data.PixelX))
	assert.Equal(t, 1, int(data.PixelY))
}

func (player *frontendPlayer) sendHttpRequest(method string, path string, body map[string]any) ([]byte, error) {
	jsonBody, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}
	req, err := http.NewRequestWithContext(player.ctx, method, fmt.Sprintf("http://%s/%s", http_service.HttpServerAddr, path), bytes.NewBuffer(jsonBody))
	if err != nil {
		return nil, err
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	respBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	return respBytes, nil
}
