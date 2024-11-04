package test

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"artyomliou/xenoblast-backend/internal/pkg_proto/http_api"
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
	"net/url"
	"os"
	"strconv"
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
	playerId       int32
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
		logger:        log.New(os.Stdout, fmt.Sprintf("[FrontendPlayer][%s] ", nickname), log.LstdFlags),
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
				player.sendGetWaitingPlayerCountOverHttp(t)
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
	body := &http_api.RegisterRequest{
		Nickname: player.nickname,
	}
	respBytes, err := player.sendHttpRequest(http.MethodPost, "api/auth/register", nil, body, nil)
	assert.NoError(t, err)

	resp := &http_api.RegisterResponse{}
	err = json.Unmarshal(respBytes, resp)
	assert.NoError(t, err)
	assert.NotEmpty(t, resp.ApiKey)
	assert.NotEmpty(t, resp.PlayerId)
	player.apiKey = resp.ApiKey
	player.playerId = resp.PlayerId
}

func (player *frontendPlayer) startWebsocketConnection(t *testing.T) {
	wsUrl := fmt.Sprintf("ws://%s:%d/%s?%s=%s", websocket_service.HttpServerHost, websocket_service.HttpServerPort, "ws/", http_service.ApiKeyHeader, player.apiKey)
	conn, _, err := websocket.DefaultDialer.DialContext(player.ctx, wsUrl, nil)
	assert.NoError(t, err)
	assert.NotNil(t, conn)
	player.conn = conn
}

func (player *frontendPlayer) sendEnrollMatchmakingOverHttp(t *testing.T) {
	_, err := player.sendHttpRequest(http.MethodPut, "api/matchmaking/enroll", nil, nil, &player.apiKey)
	assert.NoError(t, err)
}

func (player *frontendPlayer) sendGetWaitingPlayerCountOverHttp(t *testing.T) {
	httpResp, err := player.sendHttpRequest(http.MethodGet, "api/matchmaking/get_waiting_player_count", nil, nil, &player.apiKey)
	assert.NoError(t, err)
	assert.NotNil(t, httpResp)

	var resp http_api.GetWaitingPlayerCountResponse
	err = json.Unmarshal(httpResp, &resp)
	assert.NoError(t, err)
	assert.GreaterOrEqual(t, 2, int(resp.Count))
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
	assert.Contains(t, data.Players, player.playerId)
	assert.Empty(t, data.GameServerAddr)

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
	queries := &map[string]string{
		"GameId": strconv.Itoa(int(player.gameId)),
	}
	protobufBytes, err := player.sendHttpRequest(http.MethodGet, "api/game/get_game_info", queries, nil, &player.apiKey)
	assert.NoError(t, err)

	resp := &game.GetGameInfoResponse{}
	err = proto.Unmarshal(protobufBytes, resp)
	assert.NoError(t, err)

	assert.EqualValues(t, player.gameId, resp.GameId)
	assert.EqualValues(t, maploader.MapWidth, resp.MapWidth)
	assert.EqualValues(t, maploader.MapHeight, resp.MapHeight)

	hasCurrentUser := false
	for _, respPlayer := range resp.Players {
		if respPlayer.PlayerId == player.playerId {
			assert.Equal(t, player.nickname, respPlayer.Nickname)
			hasCurrentUser = true
		}
	}
	assert.Equal(t, true, hasCurrentUser)

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
				PlayerId: player.playerId,
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
				PlayerId: player.playerId,
				X:        1,
				Y:        1,
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
}

func (player *frontendPlayer) sendHttpRequest(method string, path string, newQueries *map[string]string, body any, apiKey *string) ([]byte, error) {
	apiUrl, err := url.Parse(fmt.Sprintf("http://%s:%d/%s", http_service.HttpServerHost, http_service.HttpServerPort, path))
	if err != nil {
		return nil, err
	}
	if newQueries != nil {
		queries := apiUrl.Query()
		for k, v := range *newQueries {
			queries.Set(k, v)
		}
		apiUrl.RawQuery = queries.Encode()
	}

	var jsonBody []byte
	if body != nil {
		jsonBody, err = json.Marshal(body)
		if err != nil {
			return nil, err
		}
	}

	req, err := http.NewRequestWithContext(player.ctx, method, apiUrl.String(), bytes.NewBuffer(jsonBody))
	if err != nil {
		return nil, err
	}
	if apiKey != nil {
		req.Header.Set(http_service.ApiKeyHeader, *apiKey)
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
