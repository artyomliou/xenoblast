package matchmaking_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"fmt"
)

type EventDataNilError struct {
	Event *pkg_proto.Event
}

func (err *EventDataNilError) Error() string {
	return fmt.Sprintf("cannot get data from event %s", err.Event.Type.String())
}
