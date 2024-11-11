// Code generated by mockery v2.46.3. DO NOT EDIT.

package mocks

import (
	auth "artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	context "context"

	grpc "google.golang.org/grpc"

	mock "github.com/stretchr/testify/mock"
)

// AuthServiceClient is an autogenerated mock type for the AuthServiceClient type
type AuthServiceClient struct {
	mock.Mock
}

// GetNickname provides a mock function with given fields: ctx, in, opts
func (_m *AuthServiceClient) GetNickname(ctx context.Context, in *auth.GetNicknameRequest, opts ...grpc.CallOption) (*auth.GetNicknameResponse, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	if len(ret) == 0 {
		panic("no return value specified for GetNickname")
	}

	var r0 *auth.GetNicknameResponse
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, *auth.GetNicknameRequest, ...grpc.CallOption) (*auth.GetNicknameResponse, error)); ok {
		return rf(ctx, in, opts...)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *auth.GetNicknameRequest, ...grpc.CallOption) *auth.GetNicknameResponse); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*auth.GetNicknameResponse)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *auth.GetNicknameRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Register provides a mock function with given fields: ctx, in, opts
func (_m *AuthServiceClient) Register(ctx context.Context, in *auth.RegisterRequest, opts ...grpc.CallOption) (*auth.RegisterResponse, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	if len(ret) == 0 {
		panic("no return value specified for Register")
	}

	var r0 *auth.RegisterResponse
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, *auth.RegisterRequest, ...grpc.CallOption) (*auth.RegisterResponse, error)); ok {
		return rf(ctx, in, opts...)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *auth.RegisterRequest, ...grpc.CallOption) *auth.RegisterResponse); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*auth.RegisterResponse)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *auth.RegisterRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Validate provides a mock function with given fields: ctx, in, opts
func (_m *AuthServiceClient) Validate(ctx context.Context, in *auth.ValidateRequest, opts ...grpc.CallOption) (*auth.PlayerInfoDto, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	if len(ret) == 0 {
		panic("no return value specified for Validate")
	}

	var r0 *auth.PlayerInfoDto
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, *auth.ValidateRequest, ...grpc.CallOption) (*auth.PlayerInfoDto, error)); ok {
		return rf(ctx, in, opts...)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *auth.ValidateRequest, ...grpc.CallOption) *auth.PlayerInfoDto); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*auth.PlayerInfoDto)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *auth.ValidateRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// NewAuthServiceClient creates a new instance of AuthServiceClient. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewAuthServiceClient(t interface {
	mock.TestingT
	Cleanup(func())
}) *AuthServiceClient {
	mock := &AuthServiceClient{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}