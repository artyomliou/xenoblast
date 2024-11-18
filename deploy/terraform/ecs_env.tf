locals {
  environment = [
    {
      name  = "GRPC_GO_LOG_VERBOSITY_LEVEL"
      value = "99"
    },
    {
      name  = "GRPC_GO_LOG_SEVERITY_LEVEL"
      value = "info"
    },
    {
      name  = "environment"
      value = "prod"
    },
    {
      name  = "http_service_port"
      value = "8081"
    },
    {
      name  = "websocket_service_port"
      value = "8082"
    },
    {
      name  = "auth_service_resolve_srv"
      value = "true"
    },
    {
      name  = "auth_service_host"
      value = "auth_service.xenoblast"
    },
    {
      name  = "matchmaking_service_resolve_srv"
      value = "true"
    },
    {
      name  = "matchmaking_service_host"
      value = "matchmaking_service.xenoblast"
    },
    {
      name  = "game_service_resolve_srv"
      value = "true"
    },
    {
      name  = "game_service_host"
      value = "game_service.xenoblast"
    },
  ]
}
