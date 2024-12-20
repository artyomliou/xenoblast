// Code generated by mockery v2.46.3. DO NOT EDIT.

package mocks

import (
	game "artyomliou/xenoblast-backend/internal/pkg_proto/game"
	context "context"

	emptypb "google.golang.org/protobuf/types/known/emptypb"

	grpc "google.golang.org/grpc"

	mock "github.com/stretchr/testify/mock"

	pkg_proto "artyomliou/xenoblast-backend/internal/pkg_proto"
)

// GameServiceClient is an autogenerated mock type for the GameServiceClient type
type GameServiceClient struct {
	mock.Mock
}

// GetGameInfo provides a mock function with given fields: ctx, in, opts
func (_m *GameServiceClient) GetGameInfo(ctx context.Context, in *game.GetGameInfoRequest, opts ...grpc.CallOption) (*game.GetGameInfoResponse, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	if len(ret) == 0 {
		panic("no return value specified for GetGameInfo")
	}

	var r0 *game.GetGameInfoResponse
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, *game.GetGameInfoRequest, ...grpc.CallOption) (*game.GetGameInfoResponse, error)); ok {
		return rf(ctx, in, opts...)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *game.GetGameInfoRequest, ...grpc.CallOption) *game.GetGameInfoResponse); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*game.GetGameInfoResponse)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *game.GetGameInfoRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// NewGame provides a mock function with given fields: ctx, in, opts
func (_m *GameServiceClient) NewGame(ctx context.Context, in *game.NewGameRequest, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	if len(ret) == 0 {
		panic("no return value specified for NewGame")
	}

	var r0 *emptypb.Empty
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, *game.NewGameRequest, ...grpc.CallOption) (*emptypb.Empty, error)); ok {
		return rf(ctx, in, opts...)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *game.NewGameRequest, ...grpc.CallOption) *emptypb.Empty); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*emptypb.Empty)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *game.NewGameRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// PlayerPublish provides a mock function with given fields: ctx, in, opts
func (_m *GameServiceClient) PlayerPublish(ctx context.Context, in *pkg_proto.Event, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	if len(ret) == 0 {
		panic("no return value specified for PlayerPublish")
	}

	var r0 *emptypb.Empty
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, *pkg_proto.Event, ...grpc.CallOption) (*emptypb.Empty, error)); ok {
		return rf(ctx, in, opts...)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *pkg_proto.Event, ...grpc.CallOption) *emptypb.Empty); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*emptypb.Empty)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *pkg_proto.Event, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Subscribe provides a mock function with given fields: ctx, in, opts
func (_m *GameServiceClient) Subscribe(ctx context.Context, in *game.SubscribeRequest, opts ...grpc.CallOption) (grpc.ServerStreamingClient[pkg_proto.Event], error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	if len(ret) == 0 {
		panic("no return value specified for Subscribe")
	}

	var r0 grpc.ServerStreamingClient[pkg_proto.Event]
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, *game.SubscribeRequest, ...grpc.CallOption) (grpc.ServerStreamingClient[pkg_proto.Event], error)); ok {
		return rf(ctx, in, opts...)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *game.SubscribeRequest, ...grpc.CallOption) grpc.ServerStreamingClient[pkg_proto.Event]); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(grpc.ServerStreamingClient[pkg_proto.Event])
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *game.SubscribeRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// NewGameServiceClient creates a new instance of GameServiceClient. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewGameServiceClient(t interface {
	mock.TestingT
	Cleanup(func())
}) *GameServiceClient {
	mock := &GameServiceClient{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
