data "aws_route53_zone" "main" {
  name = var.route_53_zone_name
}

resource "aws_route53_record" "lb" {
  count   = var.cost_saving_mode ? 0 : 1
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "${var.project_name}.${data.aws_route53_zone.main.name}"
  type    = "A"
  alias {
    zone_id                = one(aws_lb.main[*].zone_id)
    name                   = one(aws_lb.main[*].dns_name)
    evaluate_target_health = false
  }
}
