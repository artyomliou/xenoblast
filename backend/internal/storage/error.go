package storage

import "fmt"

type NilError struct {
	Key string
}

func (err *NilError) Error() string {
	return fmt.Sprintf("key %s is empty", err.Key)
}

type NotSufficientError struct {
	Key string
}

func (err *NotSufficientError) Error() string {
	return fmt.Sprintf("key %s is not sufficient to fulfill request", err.Key)
}
