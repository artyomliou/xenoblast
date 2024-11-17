
resource "aws_ecs_service" "backend" {
  name            = "${var.project_name}-backend"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = var.cost_saving_mode ? 0 : 1

  capacity_provider_strategy {
    base              = 0
    capacity_provider = "FARGATE_SPOT"
    weight            = 100
  }

  network_configuration {
    subnets          = [for subnet in aws_subnet.public : subnet.id]
    security_groups  = [aws_security_group.api_gateway.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend.arn
    container_name   = "api_gateway"
    container_port   = 80
  }

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }
}

# https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html
resource "aws_ecs_task_definition" "backend" {
  family             = "backend"
  cpu                = "256"
  memory             = "1024"
  task_role_arn      = aws_iam_role.ecs_task_role.arn
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn

  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc" # fargate requires awsvpc
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions
  # TODO systemControls net.ipv4.tcp_keepalive_time
  container_definitions = jsonencode([
    {
      name  = "api_gateway"
      image = "${local.api_gateway_image}"
      portMappings = [
        {
          containerPort = 80
          protocol      = "tcp"
          appProtocol   = "http2"
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
      name       = "http_service"
      image      = "${local.backend_image}"
      entryPoint = ["/app/server", "-service"]
      command    = ["http"]
      portMappings = [
        {
          containerPort = 8081
          protocol      = "tcp"
          appProtocol   = "http"
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
      dependsOn = [
        {
          containerName = "collector"
          condition     = "START"
        }
      ]
    },
    {
      name       = "websocket_service"
      image      = "${local.backend_image}"
      entryPoint = ["/app/server", "-service"]
      command    = ["websocket"]
      portMappings = [
        {
          containerPort = 8082
          protocol      = "tcp"
          appProtocol   = "http"
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
      dependsOn = [
        {
          containerName = "collector"
          condition     = "START"
        }
      ]
    },
    {
      name       = "auth_service"
      image      = "${local.backend_image}"
      entryPoint = ["/app/server", "-service"]
      command    = ["auth"]
      portMappings = [
        {
          containerPort = 50052
          protocol      = "tcp"
          appProtocol   = "grpc"
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
      dependsOn = [
        {
          containerName = "collector"
          condition     = "START"
        },
        {
          containerName = "redis"
          condition     = "START"
        }
      ]
    },
    {
      name       = "matchmaking_service"
      image      = "${local.backend_image}"
      entryPoint = ["/app/server", "-service"]
      command    = ["matchmaking"]
      portMappings = [
        {
          containerPort = 50053
          protocol      = "tcp"
          appProtocol   = "grpc"
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
      dependsOn = [
        {
          containerName = "collector"
          condition     = "START"
        },
        {
          containerName = "redis"
          condition     = "START"
        }
      ]
    },
    {
      name       = "game_service"
      image      = "${local.backend_image}"
      entryPoint = ["/app/server", "-service"]
      command    = ["game"]
      portMappings = [
        {
          containerPort = 50054
          protocol      = "tcp"
          appProtocol   = "grpc"
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
      dependsOn = [
        {
          containerName = "collector"
          condition     = "START"
        }
      ]
    },
    {
      name  = "redis"
      image = "redis:latest"
      portMappings = [
        {
          containerPort = 6379
          protocol      = "tcp"
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
    },
    {
      name      = "collector"
      image     = "amazon/aws-otel-collector"
      essential = true
      command   = ["--config=/etc/ecs/ecs-default-config.yaml"]
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
