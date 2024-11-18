resource "aws_eip" "main" {
  domain = "vpc"
}

resource "aws_eip_association" "main" {
  allocation_id = aws_eip.main.id
  instance_id   = aws_instance.main.id
}


resource "aws_instance" "main" {
  ami                         = data.aws_ami.ecs_optimized.id
  key_name                    = data.aws_key_pair.deployer.key_name
  vpc_security_group_ids      = [aws_security_group.api_gateway.id, aws_security_group.game_service.id]
  subnet_id                   = aws_subnet.public["ap-east-1a"].id
  associate_public_ip_address = true

  user_data                   = <<UDATA
#!/bin/bash
cat <<'EOF' >> /etc/ecs/ecs.config
ECS_CLUSTER=${aws_ecs_cluster.main.name}
EOF
UDATA
  user_data_replace_on_change = true

  instance_type = "t3.small"
  instance_market_options {
    market_type = "spot"
    spot_options {
      max_price                      = 0.0046
      spot_instance_type             = "persistent"
      instance_interruption_behavior = "stop"
    }
  }

  ebs_optimized = true
  root_block_device {
    delete_on_termination = true
    encrypted             = true
    volume_size           = 30 // required by ECS image
    volume_type           = "gp3"
    iops                  = 3000
    throughput            = 125
  }

  credit_specification {
    cpu_credits = "standard"
  }

  iam_instance_profile = aws_iam_instance_profile.main.name
  metadata_options {
    http_put_response_hop_limit = 2
    http_tokens                 = "required"
  }
}

data "aws_ami" "ecs_optimized" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
  filter {
    name   = "name"
    values = ["al2023-ami-ecs-hvm*"]
  }
}

data "aws_key_pair" "deployer" {
  key_name = var.ssh_key_name
}

resource "aws_iam_instance_profile" "main" {
  name = "${var.project_name}-ec2_instance_profile"
  role = aws_iam_role.ec2_role.name
}

resource "aws_iam_role" "ec2_role" {
  name = "${var.project_name}-ec2_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "ec2.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy" "certbot" {
  name = "CertbotDnsRoute53Policy"
  role = aws_iam_role.ec2_role.name
  policy = jsonencode(({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "route53:ListHostedZones",
          "route53:GetChange"
        ],
        "Resource" : "*"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "route53:ChangeResourceRecordSets"
        ],
        "Resource" : "${data.aws_route53_zone.main.arn}"
      }
    ]
  }))
}
