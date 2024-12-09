package utils

import (
	"crypto/rand"
	"math/big"
)

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func RandStringRunes(length int) (string, error) {
	n, err := rand.Int(rand.Reader, big.NewInt(int64(length)))
	if err != nil {
		return "", err
	}

	b := make([]rune, length)
	for i := range b {
		b[i] = letterRunes[int(n.Int64())]
	}
	return string(b), nil
}
