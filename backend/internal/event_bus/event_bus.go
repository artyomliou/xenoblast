package eventbus

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"fmt"
	"math"
	"sync"
)

type SubscriptionCallback func(event *pkg_proto.Event)

type CancelSubscription func() error

type EventBus struct {
	counter   int
	listeners map[pkg_proto.EventType]map[int]SubscriptionCallback
	mutex     sync.RWMutex
}

func NewEventBus() *EventBus {
	return &EventBus{
		listeners: make(map[pkg_proto.EventType]map[int]SubscriptionCallback),
		mutex:     sync.RWMutex{},
	}
}

func (eb *EventBus) Subscribe(eventType pkg_proto.EventType, callback SubscriptionCallback) CancelSubscription {
	eb.mutex.Lock()
	defer eb.mutex.Unlock()

	// TODO Even though it's unlikely, the listenerId might still be in use.
	eb.counter++
	if eb.counter >= math.MaxInt {
		eb.counter = 1
	}

	listenerId := eb.counter
	if _, ok := eb.listeners[eventType]; !ok {
		eb.listeners[eventType] = make(map[int]SubscriptionCallback)
	}
	eb.listeners[eventType][listenerId] = callback

	return func() error {
		return eb.StopSubscribe(eventType, listenerId)
	}
}

func (eb *EventBus) StopSubscribe(eventType pkg_proto.EventType, id int) error {
	eb.mutex.Lock()
	defer eb.mutex.Unlock()

	listeners, found := eb.listeners[eventType]
	if !found {
		return fmt.Errorf("cannot found any listener with type %s", eventType.String())
	}

	delete(listeners, id)
	return nil
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
