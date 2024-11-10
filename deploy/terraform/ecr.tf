locals {
  images = [
    "api-gateway",
    "backend",
    "collector",
    "grafana",
    "prometheus",
    "loki"
  ]
}
resource "aws_ecr_repository" "repos" {
  for_each             = toset(local.images)
  name                 = "${var.project_name}-${each.value}"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

