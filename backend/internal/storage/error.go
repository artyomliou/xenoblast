package storage

import "errors"

var ErrKeyNotFound = errors.New("not data found for key")
var ErrQueueLengthZero = errors.New("queue length is 0 and cannot fulfill request")
