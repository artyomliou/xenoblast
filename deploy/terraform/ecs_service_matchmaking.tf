resource "aws_ecs_service" "matchmaking_service" {
  name            = "${var.project_name}-matchmaking_service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.matchmaking_service.arn
  desired_count   = var.cost_saving_mode ? 0 : 1
  launch_type     = "EC2"

  deployment_minimum_healthy_percent = 0
  deployment_maximum_percent         = 100
  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  service_registries {
    registry_arn   = aws_service_discovery_service.matchmaking_service.arn
    container_name = "matchmaking_service"
    container_port = 50053
  }
}

resource "aws_ecs_task_definition" "matchmaking_service" {
  family                   = "matchmaking_service"
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  requires_compatibilities = ["EC2"]
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  network_mode = "bridge"

  container_definitions = jsonencode([
    {
      name              = "matchmaking_service"
      image             = "${local.backend_image}"
      memoryReservation = 64
      entryPoint        = ["/app/server", "-service"]
      command           = ["matchmaking"]
      portMappings = [
        {
          containerPort = 50053
          protocol      = "tcp"
          appProtocol   = "grpc"
        }
      ]
      environment = [
        {
          name  = "GRPC_GO_LOG_VERBOSITY_LEVEL"
          value = "99"
        },
        {
          name  = "GRPC_GO_LOG_SEVERITY_LEVEL"
          value = "info"
        },
      ]
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group         = "/ecs/${var.project_name}/matchmaking_service",
          awslogs-region        = "${var.aws_region}",
          awslogs-stream-prefix = "ecs",
          awslogs-create-group  = "True"
        }
      }
      links = [
        "redis:redis",
        "collector:collector"
      ]
      dependsOn = [
        {
          containerName = "redis"
          condition     = "START"
        },
        {
          containerName = "collector"
          condition     = "START"
        }
      ]
    },
    {
      name              = "redis"
      image             = "redis:latest"
      memoryReservation = 64
      portMappings = [
        {
          containerPort = 6379
          protocol      = "tcp"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group         = "/ecs/${var.project_name}/matchmaking_service",
          awslogs-region        = "${var.aws_region}",
          awslogs-stream-prefix = "ecs",
          awslogs-create-group  = "True"
        }
      }
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
          awslogs-group         = "/ecs/${var.project_name}/matchmaking_service",
          awslogs-region        = "${var.aws_region}",
          awslogs-stream-prefix = "ecs",
          awslogs-create-group  = "True"
        }
      }
    }
  ])
}
