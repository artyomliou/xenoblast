locals {
  repository = [
    "api-gateway",
    "http-service",
    "websocket-service",
    "auth-service",
    "matchmaking-service",
    "game-service",
  ]
  repository_with_available_image = [
    "api-gateway",
    "http-service",
    "websocket-service",
    "auth-service",
    "matchmaking-service",
    "game-service",
  ]
}
resource "aws_ecr_repository" "repos" {
  for_each             = toset(local.repository)
  name                 = "${var.project_name}-${each.value}"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

data "aws_ecr_image" "images" {
  for_each        = toset(local.repository_with_available_image)
  repository_name = "${var.project_name}-${each.key}"
  most_recent     = true
}

locals {
  api_gateway_image         = data.aws_ecr_image.images["api-gateway"].image_uri
  http_service_image        = data.aws_ecr_image.images["http-service"].image_uri
  websocket_service_image   = data.aws_ecr_image.images["websocket-service"].image_uri
  auth_service_image        = data.aws_ecr_image.images["auth-service"].image_uri
  matchmaking_service_image = data.aws_ecr_image.images["matchmaking-service"].image_uri
  game_service_image        = data.aws_ecr_image.images["game-service"].image_uri
}
