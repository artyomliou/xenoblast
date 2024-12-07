locals {
  images = [
    "api-gateway",
    "backend",
  ]
}
resource "aws_ecr_repository" "repos" {
  for_each             = toset(local.images)
  name                 = "${var.project_name}-${each.value}"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

data "aws_ecr_image" "images" {
  for_each        = toset(local.images)
  repository_name = "${var.project_name}-${each.key}"
  most_recent     = true
}

locals {
  api_gateway_image = data.aws_ecr_image.images["api-gateway"].image_uri
  backend_image     = data.aws_ecr_image.images["backend"].image_uri
}
