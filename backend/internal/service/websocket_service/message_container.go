package websocket_service

import "artyomliou/xenoblast-backend/internal/pkg_proto"

type messageContainer struct {
	event           *pkg_proto.Event
	err             error
	fromClient      bool
	fromMatchmaking bool
	fromGame        bool
}
