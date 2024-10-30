package auth_service

import "fmt"

type NotValidatedError struct {
	ApiKey string
}

func (err *NotValidatedError) Error() string {
	return fmt.Sprintf("api key (%s) cannot be validated", err.ApiKey)
}
