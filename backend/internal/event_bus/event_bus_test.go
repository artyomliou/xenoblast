package eventbus_test

import (
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"context"
	"testing"
	"time"
)

func TestEventBus(t *testing.T) {
	eventType := pkg_proto.EventType_SessionRun
	event := &pkg_proto.Event{
		Type: eventType,
	}
	ttl := 2 * time.Second

	t.Run("happy path", func(t *testing.T) {
		eb := eventbus.NewEventBus()

		ctx, cancel := context.WithTimeout(context.Background(), ttl)
		defer cancel()

		finishCh := make(chan any)
		eb.Subscribe(eventType, func(event *pkg_proto.Event) {
			finishCh <- true
		})
		go eb.Publish(event)

		select {
		case <-ctx.Done():
			t.Fail()
		case <-finishCh:
			t.Log("OK")
		}
	})
}
