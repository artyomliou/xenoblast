package telemetry

import (
	"go.opentelemetry.io/otel/metric"
	sdkmetric "go.opentelemetry.io/otel/sdk/metric"
)

type HttpMetrics struct {
	RequestTotal               metric.Int64Counter
	RequestDurationMillisecond metric.Int64Histogram
	ErrorTotal                 metric.Int64Counter
}

func NewHttpMetrics(mp *sdkmetric.MeterProvider) (metrics *HttpMetrics, err error) {
	name := "websocket"
	meter := mp.Meter(name)

	newMetrics := &HttpMetrics{}
	newMetrics.RequestTotal, err = meter.Int64Counter("http_request_total")
	if err != nil {
		return
	}
	newMetrics.RequestDurationMillisecond, err = meter.Int64Histogram("http_request_duration_millisecond")
	if err != nil {
		return
	}
	newMetrics.ErrorTotal, err = meter.Int64Counter("http_error_total")
	if err != nil {
		return
	}
	metrics = newMetrics
	err = nil
	return
}
