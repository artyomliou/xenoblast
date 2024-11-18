
resource "aws_service_discovery_private_dns_namespace" "main" {
  name = var.project_name
  vpc  = aws_vpc.main.id
}

resource "aws_service_discovery_service" "auth_service" {
  name = "auth_service"

  dns_config {
    namespace_id   = aws_service_discovery_private_dns_namespace.main.id
    routing_policy = "MULTIVALUE"
    dns_records {
      ttl  = 10
      type = "SRV"
    }
  }

  force_destroy = true
}

resource "aws_service_discovery_service" "matchmaking_service" {
  name = "matchmaking_service"

  dns_config {
    namespace_id   = aws_service_discovery_private_dns_namespace.main.id
    routing_policy = "MULTIVALUE"
    dns_records {
      ttl  = 10
      type = "SRV"
    }
  }

  force_destroy = true
}

resource "aws_service_discovery_service" "game_service" {
  name = "game_service"

  dns_config {
    namespace_id   = aws_service_discovery_private_dns_namespace.main.id
    routing_policy = "MULTIVALUE"
    dns_records {
      ttl  = 10
      type = "SRV"
    }
  }

  force_destroy = true
}
