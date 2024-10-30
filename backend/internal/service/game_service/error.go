package game_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"fmt"
)

type NotEnoughPlayerError struct {
	GameId int32
}

func (err *NotEnoughPlayerError) Error() string {
	return fmt.Sprintf("game %d didnt get enough player for construction", err.GameId)
}

type TooMuchPlayerError struct {
	GameId              int32
	MaxPlayerCount      int
	ReceivedPlayerCount int
}

func (err *TooMuchPlayerError) Error() string {
	return fmt.Sprintf("game %d cannot accept %d players (max: %d)", err.GameId, err.ReceivedPlayerCount, err.MaxPlayerCount)
}

type InvalidGameIdError struct {
	GameId int32
}

func (err *InvalidGameIdError) Error() string {
	return fmt.Sprintf("game id %d is invalid", err.GameId)
}

type InvalidPlayerEventTypeError struct {
	EventType pkg_proto.EventType
}

func (err *InvalidPlayerEventTypeError) Error() string {
	return fmt.Sprintf("player event cannot have %s type", err.EventType.String())
}
