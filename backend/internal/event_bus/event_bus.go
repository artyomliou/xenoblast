package eventbus

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"sync"
)

type EventListener func(event *pkg_proto.Event)

type EventBus struct {
	listeners map[pkg_proto.EventType][]EventListener
	mutex     sync.RWMutex
}

func NewEventBus() *EventBus {
	return &EventBus{
		listeners: make(map[pkg_proto.EventType][]EventListener),
		mutex:     sync.RWMutex{},
	}
}

func (eb *EventBus) Subscribe(eventType pkg_proto.EventType, listener EventListener) {
	eb.mutex.Lock()
	defer eb.mutex.Unlock()

	eb.listeners[eventType] = append(eb.listeners[eventType], listener)
}

func (eb *EventBus) Publish(event *pkg_proto.Event) {
	eb.mutex.RLock()
	defer eb.mutex.RUnlock()

	if listeners, found := eb.listeners[event.Type]; found {
		for _, listener := range listeners {
			listener(event)
		}
	}
}
