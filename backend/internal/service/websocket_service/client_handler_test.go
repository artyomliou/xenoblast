package websocket_service_test

import (
	"context"
	"testing"
	"time"
)

func TestWaitOnNilChannelBlocks(t *testing.T) {
	t.Run("single channel", func(t *testing.T) {
		t.Parallel()
		ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
		defer cancel()

		var ch chan bool = nil

		select {
		case <-ctx.Done():
			t.Log("ok")
		case v, ok := <-ch:
			t.Errorf("unexpected value from ch: v=%+v ok=%t", v, ok)
		}
	})

	t.Run("1 normal channel & 1 nil channel", func(t *testing.T) {
		t.Parallel()
		ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
		defer cancel()

		var ch1 chan bool
		var ch2 chan bool = nil

		ticker := time.NewTicker(500 * time.Millisecond)
		go func() {
			for {
				select {
				case <-ctx.Done():
					return
				case <-ticker.C:
					ch1 <- true
				}
			}
		}()

		for {
			select {
			case <-ctx.Done():
				t.Log("ok")
				return
			case <-ch1:
				t.Logf("ch1")
			case <-ch2:
				t.Error("unexpected ch2")
			}
		}
	})

	t.Run("select closed channel will finish immediately", func(t *testing.T) {
		t.Parallel()
		ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
		defer cancel()

		ch1 := make(chan bool)
		close(ch1)

		select {
		case <-ctx.Done():
			t.Error("Unexpected blocking when selecting on ch1")
		case <-ch1:
			t.Log("ok")
		}
	})
}
