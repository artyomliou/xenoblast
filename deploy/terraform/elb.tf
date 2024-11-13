locals {
  create_lb = !var.cost_saving_mode
}

resource "aws_lb" "main" {
  count              = local.create_lb ? 1 : 0
  name               = "${var.project_name}-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb.id]
  subnets            = [for subnet in aws_subnet.public : subnet.id]
  idle_timeout       = var.game_duration_seconds

  enable_xff_client_port = true
}

resource "aws_lb_listener" "https" {
  count             = local.create_lb ? 1 : 0
  load_balancer_arn = one(aws_lb.main[*].arn)
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = data.aws_acm_certificate.https.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend.arn
  }
}

resource "aws_lb_target_group" "backend" {
  name        = "${var.project_name}-backend-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    path                = "/"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200-399"
  }
}
