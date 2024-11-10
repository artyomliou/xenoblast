resource "aws_ecr_repository" "main" {
  name                 = "${var.project_name}-main"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
  encryption_configuration {
    encryption_type = "AES256"
  }
  force_delete = true
}

output "ecr_repo_arn" {
  value = aws_ecr_repository.main.arn
}

