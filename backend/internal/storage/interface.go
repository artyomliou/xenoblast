package storage

import "context"

type Storage interface {
	KvStorage
	QueueStorage
	SortedSetStorage
	SetStorage
}

type KvStorage interface {
	Has(ctx context.Context, key string) (bool, error)
	Set(ctx context.Context, key, value string) error
	Get(ctx context.Context, key string) (string, error)
	Delete(ctx context.Context, key string) error
}

type QueueStorage interface {
	QueuePush(ctx context.Context, key string, values ...string) error
	QueuePop(ctx context.Context, key string) (string, error)
	QueueLen(ctx context.Context, key string) (int, error)
}

type SortedSetStorage interface {
	SortedSetAdd(ctx context.Context, key string, member string, score int) error
	SortedSetRemove(ctx context.Context, key string, member string) error
	SortedSetGetN(ctx context.Context, key string, count int) ([]string, error)
	SortedSetLen(ctx context.Context, key string) (int, error)
}

type SetStorage interface {
	SetAdd(ctx context.Context, key string, member string) error
	SetExists(ctx context.Context, key string, member string) (bool, error)
	SetRemove(ctx context.Context, key string, member string) error
}
