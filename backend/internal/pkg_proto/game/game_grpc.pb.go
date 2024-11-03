// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.5.1
// - protoc             v3.12.4
// source: game.proto

package game

import (
	pkg_proto "artyomliou/xenoblast-backend/internal/pkg_proto"
	context "context"
	empty "github.com/golang/protobuf/ptypes/empty"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.64.0 or later.
const _ = grpc.SupportPackageIsVersion9

const (
	GameService_NewGame_FullMethodName       = "/game.GameService/NewGame"
	GameService_GetGameInfo_FullMethodName   = "/game.GameService/GetGameInfo"
	GameService_PlayerPublish_FullMethodName = "/game.GameService/PlayerPublish"
	GameService_Subscribe_FullMethodName     = "/game.GameService/Subscribe"
)

// GameServiceClient is the client API for GameService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type GameServiceClient interface {
	NewGame(ctx context.Context, in *NewGameRequest, opts ...grpc.CallOption) (*empty.Empty, error)
	GetGameInfo(ctx context.Context, in *GetGameInfoRequest, opts ...grpc.CallOption) (*GetGameInfoResponse, error)
	PlayerPublish(ctx context.Context, in *pkg_proto.Event, opts ...grpc.CallOption) (*empty.Empty, error)
	Subscribe(ctx context.Context, in *SubscribeRequest, opts ...grpc.CallOption) (grpc.ServerStreamingClient[pkg_proto.Event], error)
}

type gameServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewGameServiceClient(cc grpc.ClientConnInterface) GameServiceClient {
	return &gameServiceClient{cc}
}

func (c *gameServiceClient) NewGame(ctx context.Context, in *NewGameRequest, opts ...grpc.CallOption) (*empty.Empty, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(empty.Empty)
	err := c.cc.Invoke(ctx, GameService_NewGame_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *gameServiceClient) GetGameInfo(ctx context.Context, in *GetGameInfoRequest, opts ...grpc.CallOption) (*GetGameInfoResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(GetGameInfoResponse)
	err := c.cc.Invoke(ctx, GameService_GetGameInfo_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *gameServiceClient) PlayerPublish(ctx context.Context, in *pkg_proto.Event, opts ...grpc.CallOption) (*empty.Empty, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(empty.Empty)
	err := c.cc.Invoke(ctx, GameService_PlayerPublish_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *gameServiceClient) Subscribe(ctx context.Context, in *SubscribeRequest, opts ...grpc.CallOption) (grpc.ServerStreamingClient[pkg_proto.Event], error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	stream, err := c.cc.NewStream(ctx, &GameService_ServiceDesc.Streams[0], GameService_Subscribe_FullMethodName, cOpts...)
	if err != nil {
		return nil, err
	}
	x := &grpc.GenericClientStream[SubscribeRequest, pkg_proto.Event]{ClientStream: stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

// This type alias is provided for backwards compatibility with existing code that references the prior non-generic stream type by name.
type GameService_SubscribeClient = grpc.ServerStreamingClient[pkg_proto.Event]

// GameServiceServer is the server API for GameService service.
// All implementations must embed UnimplementedGameServiceServer
// for forward compatibility.
type GameServiceServer interface {
	NewGame(context.Context, *NewGameRequest) (*empty.Empty, error)
	GetGameInfo(context.Context, *GetGameInfoRequest) (*GetGameInfoResponse, error)
	PlayerPublish(context.Context, *pkg_proto.Event) (*empty.Empty, error)
	Subscribe(*SubscribeRequest, grpc.ServerStreamingServer[pkg_proto.Event]) error
	mustEmbedUnimplementedGameServiceServer()
}

// UnimplementedGameServiceServer must be embedded to have
// forward compatible implementations.
//
// NOTE: this should be embedded by value instead of pointer to avoid a nil
// pointer dereference when methods are called.
type UnimplementedGameServiceServer struct{}

func (UnimplementedGameServiceServer) NewGame(context.Context, *NewGameRequest) (*empty.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method NewGame not implemented")
}
func (UnimplementedGameServiceServer) GetGameInfo(context.Context, *GetGameInfoRequest) (*GetGameInfoResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetGameInfo not implemented")
}
func (UnimplementedGameServiceServer) PlayerPublish(context.Context, *pkg_proto.Event) (*empty.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PlayerPublish not implemented")
}
func (UnimplementedGameServiceServer) Subscribe(*SubscribeRequest, grpc.ServerStreamingServer[pkg_proto.Event]) error {
	return status.Errorf(codes.Unimplemented, "method Subscribe not implemented")
}
func (UnimplementedGameServiceServer) mustEmbedUnimplementedGameServiceServer() {}
func (UnimplementedGameServiceServer) testEmbeddedByValue()                     {}

// UnsafeGameServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to GameServiceServer will
// result in compilation errors.
type UnsafeGameServiceServer interface {
	mustEmbedUnimplementedGameServiceServer()
}

func RegisterGameServiceServer(s grpc.ServiceRegistrar, srv GameServiceServer) {
	// If the following call pancis, it indicates UnimplementedGameServiceServer was
	// embedded by pointer and is nil.  This will cause panics if an
	// unimplemented method is ever invoked, so we test this at initialization
	// time to prevent it from happening at runtime later due to I/O.
	if t, ok := srv.(interface{ testEmbeddedByValue() }); ok {
		t.testEmbeddedByValue()
	}
	s.RegisterService(&GameService_ServiceDesc, srv)
}

func _GameService_NewGame_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(NewGameRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(GameServiceServer).NewGame(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: GameService_NewGame_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(GameServiceServer).NewGame(ctx, req.(*NewGameRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _GameService_GetGameInfo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetGameInfoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(GameServiceServer).GetGameInfo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: GameService_GetGameInfo_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(GameServiceServer).GetGameInfo(ctx, req.(*GetGameInfoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _GameService_PlayerPublish_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(pkg_proto.Event)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(GameServiceServer).PlayerPublish(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: GameService_PlayerPublish_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(GameServiceServer).PlayerPublish(ctx, req.(*pkg_proto.Event))
	}
	return interceptor(ctx, in, info, handler)
}

func _GameService_Subscribe_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(SubscribeRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(GameServiceServer).Subscribe(m, &grpc.GenericServerStream[SubscribeRequest, pkg_proto.Event]{ServerStream: stream})
}

// This type alias is provided for backwards compatibility with existing code that references the prior non-generic stream type by name.
type GameService_SubscribeServer = grpc.ServerStreamingServer[pkg_proto.Event]

// GameService_ServiceDesc is the grpc.ServiceDesc for GameService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var GameService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "game.GameService",
	HandlerType: (*GameServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "NewGame",
			Handler:    _GameService_NewGame_Handler,
		},
		{
			MethodName: "GetGameInfo",
			Handler:    _GameService_GetGameInfo_Handler,
		},
		{
			MethodName: "PlayerPublish",
			Handler:    _GameService_PlayerPublish_Handler,
		},
	},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "Subscribe",
			Handler:       _GameService_Subscribe_Handler,
			ServerStreams: true,
		},
	},
	Metadata: "game.proto",
}