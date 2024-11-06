package telemetry

import (
	"artyomliou/xenoblast-backend/internal/config"
	"context"
	"fmt"
	"time"

	"go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetricgrpc"
	"go.opentelemetry.io/otel/exporters/stdout/stdoutmetric"
	"go.opentelemetry.io/otel/exporters/stdout/stdouttrace"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/metric"
	"go.opentelemetry.io/otel/sdk/trace"
	"go.uber.org/fx"
)

func NewTraceProvider(lc fx.Lifecycle, _ propagation.TextMapPropagator) (*trace.TracerProvider, error) {
	traceExporter, err := stdouttrace.New(stdouttrace.WithPrettyPrint())
	if err != nil {
		return nil, err
	}

	// Default is 5s. Set to 1s for demonstrative purposes.
	traceProvider := trace.NewTracerProvider(
		trace.WithBatcher(traceExporter, trace.WithBatchTimeout(time.Second)),
	)

	lc.Append(fx.Hook{
		OnStop: func(ctx context.Context) error {
			if err := traceProvider.Shutdown(ctx); err != nil {
				return err
			}
			return nil
		},
	})

	return traceProvider, nil
}

func NewMeterProvider(lc fx.Lifecycle, cfg *config.Config, _ propagation.TextMapPropagator) (*metric.MeterProvider, error) {
	var metricExporter metric.Exporter
	var err error
	if cfg.Environment == config.TestingEnvironment {
		metricExporter, err = stdoutmetric.New()
	} else {
		var options []otlpmetricgrpc.Option
		endpoint := fmt.Sprintf("%s:%d", cfg.Collector.Host, cfg.Collector.Port)
		options = append(options, otlpmetricgrpc.WithEndpoint(endpoint))
		options = append(options, otlpmetricgrpc.WithInsecure())

		metricExporter, err = otlpmetricgrpc.New(context.TODO(), options...)
	}
	if err != nil {
		return nil, err
	}

	// Default is 1m. Set to 3s for demonstrative purposes.
	meterProvider := metric.NewMeterProvider(
		metric.WithReader(metric.NewPeriodicReader(metricExporter, metric.WithInterval(3*time.Second))),
	)

	lc.Append(fx.Hook{
		OnStop: func(ctx context.Context) error {
			if err := meterProvider.Shutdown(ctx); err != nil {
				return err
			}
			return nil
		},
	})

	return meterProvider, nil
}

func NewPropagator() propagation.TextMapPropagator {
	return propagation.NewCompositeTextMapPropagator(
		propagation.TraceContext{},
		propagation.Baggage{},
	)
}
