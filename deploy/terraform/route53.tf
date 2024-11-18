data "aws_route53_zone" "main" {
  name = var.route_53_zone_name
}

resource "aws_route53_record" "lb" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "${var.project_name}.${data.aws_route53_zone.main.name}"
  type    = "A"
  ttl     = 300
  records = [aws_eip.main.public_ip]
}
