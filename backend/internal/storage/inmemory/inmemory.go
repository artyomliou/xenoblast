package inmemory

import (
	"artyomliou/xenoblast-backend/internal/storage"
	"context"
	"sync"
)

type inmemoryStorage struct {
	mutex     sync.Mutex
	m         map[string]string
	queues    map[string][]string
	sortedSet map[string]int
	set       map[string]bool
}

func CreateInmemoryStorage() *inmemoryStorage {
	return &inmemoryStorage{
		mutex:     sync.Mutex{},
		m:         map[string]string{},
		queues:    map[string][]string{},
		sortedSet: map[string]int{},
		set:       map[string]bool{},
	}
}

// KvStorage
func (inmemory *inmemoryStorage) Has(ctx context.Context, key string) (bool, error) {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	_, ok := inmemory.m[key]
	return ok, nil
}

func (inmemory *inmemoryStorage) Set(ctx context.Context, key, value string) error {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	inmemory.m[key] = value
	return nil
}
func (inmemory *inmemoryStorage) Get(ctx context.Context, key string) (string, error) {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	if v, ok := inmemory.m[key]; ok {
		return v, nil
	} else {
		return "", storage.ErrKeyNotFound
	}
}
func (inmemory *inmemoryStorage) Delete(ctx context.Context, key string) error {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	delete(inmemory.m, key)
	return nil
}

func (inmemory *inmemoryStorage) QueuePush(ctx context.Context, key string, values ...string) error {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	inmemory.ensureListExists(key)
	inmemory.queues[key] = append(inmemory.queues[key], values...)
	return nil
}

func (inmemory *inmemoryStorage) QueuePop(ctx context.Context, key string) (string, error) {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	inmemory.ensureListExists(key)
	if res, ok := inmemory.queuePop(key); ok {
		return res, nil
	}
	return "", storage.ErrQueueLengthZero
}

func (inmemory *inmemoryStorage) queuePop(key string) (string, bool) {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	if len(inmemory.queues[key]) == 0 {
		return "", false
	}
	tmp := inmemory.queues[key][0]
	inmemory.queues[key] = inmemory.queues[key][1:]
	return tmp, true
}

func (inmemory *inmemoryStorage) QueueLen(ctx context.Context, key string) (int, error) {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	return len(inmemory.queues[key]), nil
}

func (inmemory *inmemoryStorage) ensureListExists(key string) {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	if _, ok := inmemory.queues[key]; !ok {
		inmemory.queues[key] = []string{}
	}
}

func (inmemory *inmemoryStorage) SortedSetAdd(ctx context.Context, key string, member string, score int) error {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	inmemory.sortedSet[member] = score
	return nil
}

func (inmemory *inmemoryStorage) SortedSetRemove(ctx context.Context, key string, member string) error {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	delete(inmemory.sortedSet, member)
	return nil
}

func (inmemory *inmemoryStorage) SortedSetGetN(ctx context.Context, key string, count int) ([]string, error) {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	result := []string{}
	i := 0
	for k := range inmemory.sortedSet {
		result = append(result, k)
		i++
		if i >= count {
			break
		}
	}
	return result, nil
}

func (inmemory *inmemoryStorage) SortedSetLen(ctx context.Context, key string) (int, error) {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	return len(inmemory.sortedSet), nil
}

func (inmemory *inmemoryStorage) SetAdd(ctx context.Context, key string, member string) error {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	inmemory.set[member] = true
	return nil
}

func (inmemory *inmemoryStorage) SetExists(ctx context.Context, key string, member string) (bool, error) {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	_, ok := inmemory.set[member]
	return ok, nil
}

func (inmemory *inmemoryStorage) SetRemove(ctx context.Context, key string, member string) error {
	inmemory.mutex.Lock()
	defer inmemory.mutex.Unlock()

	delete(inmemory.set, member)
	return nil
}
