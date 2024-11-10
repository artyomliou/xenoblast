# https://github.com/aws-actions/configure-aws-credentials?tab=readme-ov-file#configuring-iam-to-trust-github

variable "github_org" {
  description = "Name of GitHub organization/user (case sensitive)"
  type        = string
}

variable "repository_name" {
  description = "Name of GitHub repository (case sensitive)"
  type        = string
}

variable "oidc_provider_arn" {
  description = "Arn for the GitHub OIDC Provider."
  type        = string
  default     = ""
}

variable "oidc_audience" {
  description = "Audience supplied to configure-aws-credentials."
  type        = string
  default     = "sts.amazonaws.com"
}

# Condition: Check if OIDCProviderArn is provided
locals {
  create_oidc_provider = var.oidc_provider_arn == ""
}

resource "aws_iam_openid_connect_provider" "github_oidc" {
  count           = local.create_oidc_provider ? 1 : 0
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = [var.oidc_audience]
  thumbprint_list = ["ffffffffffffffffffffffffffffffffffffffff"]
}

resource "aws_iam_role" "github_actions_role" {
  name = "github-actions-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = "sts:AssumeRoleWithWebIdentity"
        Principal = {
          Federated = local.create_oidc_provider ? aws_iam_openid_connect_provider.github_oidc[0].arn : var.oidc_provider_arn
        }
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = var.oidc_audience
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_org}/${var.repository_name}:*"
          }
        }
      }
    ]
  })
}

output "role_arn" {
  value = aws_iam_role.github_actions_role.arn
}
