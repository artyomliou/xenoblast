# https://github.com/aws-actions/amazon-ecr-login?tab=readme-ov-file#permissions
resource "aws_iam_role_policy" "github_actions_push_ecr" {
  name = "github_actions_push_ecr"
  role = aws_iam_role.github_actions_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ecr:BatchGetImage",
          "ecr:BatchCheckLayerAvailability",
          "ecr:CompleteLayerUpload",
          "ecr:GetDownloadUrlForLayer",
          "ecr:InitiateLayerUpload",
          "ecr:PutImage",
          "ecr:UploadLayerPart"
        ]

        Resource = [for repo in aws_ecr_repository.repos : repo.arn]
      },
    ]
  })
}
