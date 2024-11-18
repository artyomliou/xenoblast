package cloudmapdns_resolver

import (
	"errors"
	"fmt"
	"net"

	"go.uber.org/zap"
	"google.golang.org/grpc/resolver"
)

const Scheme = "cloudmapdns"

type cloudmapdnsBuilder struct{}

func (*cloudmapdnsBuilder) Build(target resolver.Target, cc resolver.ClientConn, opts resolver.BuildOptions) (resolver.Resolver, error) {
	logger, err := zap.NewProduction()
	if err != nil {
		return nil, err
	}

	if target.Endpoint() == "" && opts.Dialer == nil {
		return nil, errors.New("cloudmapdns: received empty target in Build()")
	}

	// Will not use provided port
	host, _, err := net.SplitHostPort(target.Endpoint())
	if err != nil {
		return nil, err
	}

	r := &cloudmapdnsResolver{
		host:   host,
		cc:     cc,
		logger: logger,
	}
	r.start()
	return r, nil
}

func (*cloudmapdnsBuilder) Scheme() string {
	return Scheme
}

type cloudmapdnsResolver struct {
	host   string
	cc     resolver.ClientConn
	logger *zap.Logger
}

func (r *cloudmapdnsResolver) start() {
	addresses, err := ResolveSrvToAddrs(r.host)
	if err != nil {
		r.logger.Error(err.Error())
		return
	}

	r.cc.UpdateState(
		resolver.State{
			Addresses: addresses,
		},
	)
}

func ResolveSrvToAddrs(endpoint string) ([]resolver.Address, error) {
	_, addrs, err := net.LookupSRV("", "", endpoint)
	if err != nil {
		return nil, err
	}

	addresses := []resolver.Address{}
	for _, addr := range addrs {
		ip, err := net.ResolveIPAddr("ip", addr.Target)
		if err != nil {
			return nil, err
		}
		addresses = append(addresses, resolver.Address{
			Addr: fmt.Sprintf("%s:%d", ip.String(), addr.Port),
		})
	}
	return addresses, nil
}

func (*cloudmapdnsResolver) ResolveNow(resolver.ResolveNowOptions) {}

func (*cloudmapdnsResolver) Close() {}

func init() {
	resolver.Register(&cloudmapdnsBuilder{})
}
