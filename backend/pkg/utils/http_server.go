package utils

import (
	"context"
	"log"
	"net/http"
	"sync"
	"time"
)

func StartHttpServer(ctx context.Context, wg *sync.WaitGroup, addr string, mux http.Handler) {
	if wg != nil {
		defer wg.Done()
	}

	server := &http.Server{
		Addr:    addr,
		Handler: mux,
	}

	go func() {
		log.Println("HTTP Server running on ", addr)
		if err := server.ListenAndServe(); err != nil {
			log.Fatalf("Server failed to start: %v", err)
		}
	}()

	<-ctx.Done()
	log.Println("Shutdown signal received")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := server.Shutdown(ctx); err != nil {
		log.Fatal("Server Shutdown Failed: ", err)
	}
	log.Println("Server exited properly")
}
