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

resource "aws_iam_role_policy" "github_actions_update_ecs" {
  name = "github_actions_update_ecs"
  role = aws_iam_role.github_actions_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecs:DescribeTaskDefinition",
          "ecs:RegisterTaskDefinition"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "iam:PassRole"
        ]
        Resource = [
          aws_iam_role.ecs_task_role.arn,
          aws_iam_role.ecs_task_execution_role.arn
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "ecs:UpdateService",
          "ecs:DescribeServices"
        ]

        Resource = [
          one(aws_ecs_service.backend[*].id),
          one(aws_ecs_service.auth_service[*].id),
          one(aws_ecs_service.matchmaking_service[*].id),
          one(aws_ecs_service.game_service[*].id)
        ]
      },
    ]
  })
}
