variable "project_name" {
  type = string
}

variable "aws_region" {
  type = string
}

variable "ssh_key_name" {
  type = string
}

variable "ssh_ip" {
  type = string
}

variable "https_domain" {
  type = string
}

variable "route_53_zone_name" {
  type    = string
  default = "example.com."
}

variable "cost_saving_mode" {
  type = bool
}
