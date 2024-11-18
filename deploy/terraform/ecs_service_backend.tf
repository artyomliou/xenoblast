resource "aws_ecs_service" "backend" {
  name            = "${var.project_name}-backend"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = var.cost_saving_mode ? 0 : 1
  launch_type     = "EC2"

  deployment_minimum_healthy_percent = 0
  deployment_maximum_percent         = 100
  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }
}

# https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html
resource "aws_ecs_task_definition" "backend" {
  family                   = "backend"
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  requires_compatibilities = ["EC2"]
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  # Because I only want 1 task on 1 EC2 instance, it will be much easier to use bridge mode.
  # https://docs.aws.amazon.com/zh_tw/AmazonECS/latest/developerguide/networking-networkmode-bridge.html
  network_mode = "bridge"

  volume {
    name      = "https_certs"
    host_path = var.ec2_https_certs_path
  }

  volume {
    name      = "letsencrypt_archive"
    host_path = "/etc/letsencrypt/archive"
  }

  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions
  # TODO systemControls net.ipv4.tcp_keepalive_time
  container_definitions = jsonencode([
    {
      name              = "api_gateway"
      image             = "${local.api_gateway_image}"
      memoryReservation = 64
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
          appProtocol   = "http2"
        },
        {
          containerPort = 443
          hostPort      = 443
          protocol      = "tcp"
          appProtocol   = "http2"
        }
      ]
      mountPoints = [
        {
          sourceVolume  = "https_certs"
          containerPath = "/etc/nginx/ssl" # link: ../../archive (=/etc/archive) 
        },
        {
          sourceVolume  = "letsencrypt_archive"
          containerPath = "/etc/archive" # workaround: match relative link of /etc/nginx/ssl
        }
      ]
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group         = "/ecs/${var.project_name}",
          awslogs-region        = "${var.aws_region}",
          awslogs-stream-prefix = "ecs",
          awslogs-create-group  = "True"
        }
      }
      links = [
        "http_service:http_service",
        "websocket_service:websocket_service"
      ]
      dependsOn = [
        {
          containerName = "http_service"
          condition     = "START"
        },
        {
          containerName = "websocket_service"
          condition     = "START"
        }
      ]
    },
    {
      name              = "http_service"
      image             = "${local.backend_image}"
      memoryReservation = 64
      entryPoint        = ["/app/server", "-service"]
      command           = ["http"]
      portMappings = [
        {
          containerPort = 8081
          protocol      = "tcp"
          appProtocol   = "http"
        }
      ]
      environment = local.environment
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group         = "/ecs/${var.project_name}",
          awslogs-region        = "${var.aws_region}",
          awslogs-stream-prefix = "ecs",
          awslogs-create-group  = "True"
        }
      }
      links = [
        "collector:collector"
      ]
      dependsOn = [
        {
          containerName = "collector"
          condition     = "START"
        }
      ]
    },
    {
      name              = "websocket_service"
      image             = "${local.backend_image}"
      memoryReservation = 64
      entryPoint        = ["/app/server", "-service"]
      command           = ["websocket"]
      portMappings = [
        {
          containerPort = 8082
          protocol      = "tcp"
          appProtocol   = "http"
        }
      ]
      environment = local.environment
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group         = "/ecs/${var.project_name}",
          awslogs-region        = "${var.aws_region}",
          awslogs-stream-prefix = "ecs",
          awslogs-create-group  = "True"
        }
      }
      links = [
        "collector:collector"
      ]
      dependsOn = [
        {
          containerName = "collector"
          condition     = "START"
        }
      ]
    },
    {
      name              = "collector"
      image             = "amazon/aws-otel-collector"
      memoryReservation = 64
      essential         = true
      command           = ["--config=/etc/ecs/ecs-default-config.yaml"]
      environment = [
        {
          name  = "AWS_REGION"
          value = var.aws_region
        },
      ]
      portMappings = [
        {
          containerPort = 2000
          protocol      = "udp"
        },
        {
          containerPort = 4317
          protocol      = "tcp"
        },
        {
          containerPort = 8125
          protocol      = "udp"
        }
      ]
      healthCheck = {
        command     = ["/healthcheck"],
        interval    = 5,
        timeout     = 6,
        retries     = 5,
        startPeriod = 1
      }
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group         = "/ecs/${var.project_name}",
          awslogs-region        = "${var.aws_region}",
          awslogs-stream-prefix = "ecs",
          awslogs-create-group  = "True"
        }
      }
    }
  ])
}
