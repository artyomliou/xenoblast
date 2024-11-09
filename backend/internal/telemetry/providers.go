package telemetry

import (
	"artyomliou/xenoblast-backend/internal/config"
	"context"
	"fmt"
	"time"

	"go.opentelemetry.io/otel/exporters/otlp/otlplog/otlploggrpc"
	"go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetricgrpc"
	"go.opentelemetry.io/otel/log"
	otellognoop "go.opentelemetry.io/otel/log/noop"
	"go.opentelemetry.io/otel/metric"
	otelmetricnoop "go.opentelemetry.io/otel/metric/noop"
	"go.opentelemetry.io/otel/propagation"
	otelsdklog "go.opentelemetry.io/otel/sdk/log"
	otelsdkmetric "go.opentelemetry.io/otel/sdk/metric"
	"go.uber.org/fx"
)

func NewMeterProvider(lc fx.Lifecycle, cfg *config.Config, _ propagation.TextMapPropagator) (metric.MeterProvider, error) {
	var exporter otelsdkmetric.Exporter
	var err error
	if !cfg.Collector.EnableMetricProvider {
		return otelmetricnoop.NewMeterProvider(), nil
	} else {
		var options []otlpmetricgrpc.Option
		endpoint := fmt.Sprintf("%s:%d", cfg.Collector.Host, cfg.Collector.Port)
		options = append(options, otlpmetricgrpc.WithEndpoint(endpoint))
		options = append(options, otlpmetricgrpc.WithInsecure())

		exporter, err = otlpmetricgrpc.New(context.TODO(), options...)
	}
	if err != nil {
		return nil, err
	}

	// Default is 1m. Set to 3s for demonstrative purposes.
	reader := otelsdkmetric.NewPeriodicReader(exporter, otelsdkmetric.WithInterval(3*time.Second))
	provider := otelsdkmetric.NewMeterProvider(otelsdkmetric.WithReader(reader))

	lc.Append(fx.Hook{
		OnStop: func(ctx context.Context) error {
			if err := provider.Shutdown(ctx); err != nil {
				return err
			}
			return nil
		},
	})

	return provider, nil
}

func NewLoggerProvider(lc fx.Lifecycle, cfg *config.Config, _ propagation.TextMapPropagator) (log.LoggerProvider, error) {
	var exporter otelsdklog.Exporter
	var err error
	if !cfg.Collector.EnableLogProvider {
		return otellognoop.NewLoggerProvider(), nil
	} else {
		var options []otlploggrpc.Option
		endpoint := fmt.Sprintf("%s:%d", cfg.Collector.Host, cfg.Collector.Port)
		options = append(options, otlploggrpc.WithEndpoint(endpoint))
		options = append(options, otlploggrpc.WithInsecure())

		exporter, err = otlploggrpc.New(context.TODO(), options...)
	}
	if err != nil {
		return nil, err
	}

	processor := otelsdklog.NewBatchProcessor(exporter)
	provider := otelsdklog.NewLoggerProvider(otelsdklog.WithProcessor(processor))

	lc.Append(fx.Hook{
		OnStop: func(ctx context.Context) error {
			if err := provider.Shutdown(ctx); err != nil {
				return err
			}
			return nil
		},
	})

	return provider, nil
}

func NewPropagator() propagation.TextMapPropagator {
	return propagation.NewCompositeTextMapPropagator(
		propagation.TraceContext{},
		propagation.Baggage{},
	)
}
