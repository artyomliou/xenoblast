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
	@if [ ! -x "$(GO_BIN)/mockery" ]; then \
		echo "Installing mockery..."; \
		go install github.com/vektra/mockery/v2@latest; \
	else \
		echo "mockery already installed."; \
	fi

.PHONY: proto
proto: check-tools
	@cd proto/ && protoc --go_out=../internal/pkg_proto \
    --go-grpc_out=../internal/pkg_proto \
		--go_opt=module=artyomliou/xenoblast-backend/internal/pkg_proto \
		--go-grpc_opt=module=artyomliou/xenoblast-backend/internal/pkg_proto \
		--proto_path=. \
    ./common.proto ./auth.proto ./matchmaking.proto ./game.proto ./http_api.proto

.PHONY: mock
mock: check-tools
	@mockery --name=AuthServiceClient --dir=./internal/pkg_proto/auth --output=./mocks --outpkg=mocks
	@mockery --name=MatchmakingServiceClient --dir=./internal/pkg_proto/matchmaking --output=./mocks --outpkg=mocks
	@mockery --name=GameServiceClient --dir=./internal/pkg_proto/game --output=./mocks --outpkg=mocks

.PHONY: setup
setup: 
	@if [ ! -f "config.yaml" ]; then \
		cp config.example.yaml config.yaml; \
	fi
	@echo "Environment setup complete!"; \

.PHONY: test
test: setup
	go test --coverprofile=coverage.out ./...