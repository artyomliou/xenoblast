variable "project_name" {
  type = string
}

variable "aws_region" {
  type = string
}

variable "https_domain" {
  type = string
}

variable "cost_saving_mode" {
  type = bool
}

variable "game_duration_seconds" {
  type        = number
  default     = 180
  description = "ensure websocket will not be closed within GameDuration by ELB"
}
