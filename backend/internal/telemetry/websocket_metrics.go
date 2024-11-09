package telemetry

import (
	"go.opentelemetry.io/otel/metric"
)

type WebsocketMetrics struct {
	RequestTotal                  metric.Int64Counter
	RequestDurationMillisecond    metric.Int64Histogram
	ConnectionTotal               metric.Int64Counter
	ConnectionActive              metric.Int64UpDownCounter
	ConnectionDurationMillisecond metric.Int64Histogram
	MessageReceived               metric.Int64Counter
	MessageSent                   metric.Int64Counter
	MessageDurationMillisecond    metric.Int64Histogram
	ServerEventReceived           metric.Int64Counter
	ErrorTotal                    metric.Int64Counter
}

func NewWebsocketMetrics(mp metric.MeterProvider) (metrics *WebsocketMetrics, err error) {
	name := "websocket"
	meter := mp.Meter(name)

	newMetrics := &WebsocketMetrics{}
	newMetrics.RequestTotal, err = meter.Int64Counter("websocket_request_total")
	if err != nil {
		return
	}
	newMetrics.RequestDurationMillisecond, err = meter.Int64Histogram("websocket_request_duration_millisecond")
	if err != nil {
		return
	}
	newMetrics.ConnectionTotal, err = meter.Int64Counter("websocket_connection_total")
	if err != nil {
		return
	}
	newMetrics.ConnectionActive, err = meter.Int64UpDownCounter("websocket_connection_active")
	if err != nil {
		return
	}
	newMetrics.ConnectionDurationMillisecond, err = meter.Int64Histogram("websocket_connection_duration_millisecond")
	if err != nil {
		return
	}
	newMetrics.MessageReceived, err = meter.Int64Counter("websocket_message_received")
	if err != nil {
		return
	}
	newMetrics.MessageSent, err = meter.Int64Counter("websocket_message_sent")
	if err != nil {
		return
	}
	newMetrics.MessageDurationMillisecond, err = meter.Int64Histogram("websocket_message_duration_millisecond")
	if err != nil {
		return
	}
	newMetrics.ServerEventReceived, err = meter.Int64Counter("websocket_server_event_received")
	if err != nil {
		return
	}
	newMetrics.ErrorTotal, err = meter.Int64Counter("websocket_error_total")
	if err != nil {
		return
	}
	metrics = newMetrics
	err = nil
	return
}
