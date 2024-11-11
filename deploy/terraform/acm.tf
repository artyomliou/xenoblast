data "aws_acm_certificate" "https" {
  domain   = var.https_domain
  statuses = ["ISSUED"]
}
