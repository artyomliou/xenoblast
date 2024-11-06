package telemetry

import (
	"go.opentelemetry.io/otel/metric"
	sdkmetric "go.opentelemetry.io/otel/sdk/metric"
)

type WebsocketMetrics struct {
	TotalRequests       metric.Int64Counter
	RequestDuration     metric.Int64Histogram
	TotalConnections    metric.Int64Counter
	ActiveConnections   metric.Int64UpDownCounter
	ConnectionDuration  metric.Int64Histogram
	MessageReceived     metric.Int64Counter
	MessageSent         metric.Int64Counter
	MessageDuration     metric.Int64Histogram
	ServerEventReceived metric.Int64Counter
	Errors              metric.Int64Counter
}

func NewWebsocketMetrics(mp *sdkmetric.MeterProvider) (metrics *WebsocketMetrics, err error) {
	name := "websocket"
	meter := mp.Meter(name)

	newMetrics := &WebsocketMetrics{}
	newMetrics.TotalRequests, err = meter.Int64Counter("websocket_total_requests")
	if err != nil {
		return
	}
	newMetrics.RequestDuration, err = meter.Int64Histogram("websocket_request_duration")
	if err != nil {
		return
	}
	newMetrics.TotalConnections, err = meter.Int64Counter("websocket_total_connections")
	if err != nil {
		return
	}
	newMetrics.ActiveConnections, err = meter.Int64UpDownCounter("websocket_active_connections")
	if err != nil {
		return
	}
	newMetrics.ConnectionDuration, err = meter.Int64Histogram("websocket_connection_duration")
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
	newMetrics.MessageDuration, err = meter.Int64Histogram("websocket_message_duration")
	if err != nil {
		return
	}
	newMetrics.ServerEventReceived, err = meter.Int64Counter("server_event_received")
	if err != nil {
		return
	}
	newMetrics.Errors, err = meter.Int64Counter("websocket_errors")
	if err != nil {
		return
	}
	metrics = newMetrics
	err = nil
	return
}
