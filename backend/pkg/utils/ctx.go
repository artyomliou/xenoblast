package utils

import (
	"context"
	"os"
	"os/signal"
	"sync"
)

var once sync.Once

func SetupTerminableContext() context.Context {
	var ctx context.Context

	once.Do(func() {
		var cancel context.CancelFunc
		var sig chan os.Signal
		ctx, cancel = context.WithCancel(context.Background())
		sig = make(chan os.Signal, 1)
		signal.Notify(sig, os.Interrupt)
		go func() {
			for {
				<-sig
				cancel()
			}
		}()
	})

	return ctx
}
