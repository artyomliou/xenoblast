GOPATH = $(shell go env GOPATH)
GO_BIN := $(GOPATH)/bin

.PHONY: check-tools
check-tools:
# TODO go
# TODO protoc
	@if [ ! -x "$(GO_BIN)/protoc-gen-go" ]; then \
		echo "Installing protoc-gen-go..."; \
		go install google.golang.org/protobuf/cmd/protoc-gen-go@latest; \
	else \
		echo "protoc-gen-go already installed."; \
	fi
	@if [ ! -x "$(GO_BIN)/protoc-gen-go-grpc" ]; then \
		echo "Installing protoc-gen-go-grpc..."; \
		go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest; \
	else \
		echo "protoc-gen-go-grpc already installed."; \
	fi
# TODO node, npm, protobufjs-cli

.PHONY: proto
proto: check-tools
	@cd proto/ && protoc --go_out=../internal \
    --go-grpc_out=../internal \
		--proto_path=. \
    ./common.proto ./auth.proto ./matchmaking.proto ./game.proto ./http_api.proto

.PHONY: clean
clean:
	rm -rf ./internal/pkg_proto/*.pb.go

.PHONY: setup
setup: check-tools proto
	@echo "Environment setup complete!"

.PHONY: test
test: setup
	go test --coverprofile=coverage.out ./...