// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.35.1
// 	protoc        v3.12.4
// source: matchmaking.proto

package matchmaking

import (
	pkg_proto "artyomliou/xenoblast-backend/internal/pkg_proto"
	empty "github.com/golang/protobuf/ptypes/empty"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type MatchmakingRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	PlayerId int32 `protobuf:"varint,1,opt,name=playerId,proto3" json:"playerId,omitempty"`
}

func (x *MatchmakingRequest) Reset() {
	*x = MatchmakingRequest{}
	mi := &file_matchmaking_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *MatchmakingRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MatchmakingRequest) ProtoMessage() {}

func (x *MatchmakingRequest) ProtoReflect() protoreflect.Message {
	mi := &file_matchmaking_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MatchmakingRequest.ProtoReflect.Descriptor instead.
func (*MatchmakingRequest) Descriptor() ([]byte, []int) {
	return file_matchmaking_proto_rawDescGZIP(), []int{0}
}

func (x *MatchmakingRequest) GetPlayerId() int32 {
	if x != nil {
		return x.PlayerId
	}
	return 0
}

type GetWaitingPlayerCountResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Count int32 `protobuf:"varint,1,opt,name=count,proto3" json:"count,omitempty"`
}

func (x *GetWaitingPlayerCountResponse) Reset() {
	*x = GetWaitingPlayerCountResponse{}
	mi := &file_matchmaking_proto_msgTypes[1]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetWaitingPlayerCountResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetWaitingPlayerCountResponse) ProtoMessage() {}

func (x *GetWaitingPlayerCountResponse) ProtoReflect() protoreflect.Message {
	mi := &file_matchmaking_proto_msgTypes[1]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetWaitingPlayerCountResponse.ProtoReflect.Descriptor instead.
func (*GetWaitingPlayerCountResponse) Descriptor() ([]byte, []int) {
	return file_matchmaking_proto_rawDescGZIP(), []int{1}
}

func (x *GetWaitingPlayerCountResponse) GetCount() int32 {
	if x != nil {
		return x.Count
	}
	return 0
}

type GetGameServerAddrRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	PlayerId int32 `protobuf:"varint,1,opt,name=playerId,proto3" json:"playerId,omitempty"`
}

func (x *GetGameServerAddrRequest) Reset() {
	*x = GetGameServerAddrRequest{}
	mi := &file_matchmaking_proto_msgTypes[2]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetGameServerAddrRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetGameServerAddrRequest) ProtoMessage() {}

func (x *GetGameServerAddrRequest) ProtoReflect() protoreflect.Message {
	mi := &file_matchmaking_proto_msgTypes[2]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetGameServerAddrRequest.ProtoReflect.Descriptor instead.
func (*GetGameServerAddrRequest) Descriptor() ([]byte, []int) {
	return file_matchmaking_proto_rawDescGZIP(), []int{2}
}

func (x *GetGameServerAddrRequest) GetPlayerId() int32 {
	if x != nil {
		return x.PlayerId
	}
	return 0
}

type GetGameServerAddrResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	GameServerAddr string `protobuf:"bytes,2,opt,name=gameServerAddr,proto3" json:"gameServerAddr,omitempty"`
}

func (x *GetGameServerAddrResponse) Reset() {
	*x = GetGameServerAddrResponse{}
	mi := &file_matchmaking_proto_msgTypes[3]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetGameServerAddrResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetGameServerAddrResponse) ProtoMessage() {}

func (x *GetGameServerAddrResponse) ProtoReflect() protoreflect.Message {
	mi := &file_matchmaking_proto_msgTypes[3]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetGameServerAddrResponse.ProtoReflect.Descriptor instead.
func (*GetGameServerAddrResponse) Descriptor() ([]byte, []int) {
	return file_matchmaking_proto_rawDescGZIP(), []int{3}
}

func (x *GetGameServerAddrResponse) GetGameServerAddr() string {
	if x != nil {
		return x.GameServerAddr
	}
	return ""
}

var File_matchmaking_proto protoreflect.FileDescriptor

var file_matchmaking_proto_rawDesc = []byte{
	0x0a, 0x11, 0x6d, 0x61, 0x74, 0x63, 0x68, 0x6d, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x12, 0x0b, 0x6d, 0x61, 0x74, 0x63, 0x68, 0x6d, 0x61, 0x6b, 0x69, 0x6e, 0x67,
	0x1a, 0x1b, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75,
	0x66, 0x2f, 0x65, 0x6d, 0x70, 0x74, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x0c, 0x63,
	0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x30, 0x0a, 0x12, 0x4d,
	0x61, 0x74, 0x63, 0x68, 0x6d, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x12, 0x1a, 0x0a, 0x08, 0x70, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x49, 0x64, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x05, 0x52, 0x08, 0x70, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x49, 0x64, 0x22, 0x35, 0x0a,
	0x1d, 0x47, 0x65, 0x74, 0x57, 0x61, 0x69, 0x74, 0x69, 0x6e, 0x67, 0x50, 0x6c, 0x61, 0x79, 0x65,
	0x72, 0x43, 0x6f, 0x75, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x14,
	0x0a, 0x05, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x05, 0x52, 0x05, 0x63,
	0x6f, 0x75, 0x6e, 0x74, 0x22, 0x36, 0x0a, 0x18, 0x47, 0x65, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x53,
	0x65, 0x72, 0x76, 0x65, 0x72, 0x41, 0x64, 0x64, 0x72, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x12, 0x1a, 0x0a, 0x08, 0x70, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x49, 0x64, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x05, 0x52, 0x08, 0x70, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x49, 0x64, 0x22, 0x43, 0x0a, 0x19,
	0x47, 0x65, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x41, 0x64, 0x64,
	0x72, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x26, 0x0a, 0x0e, 0x67, 0x61, 0x6d,
	0x65, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x41, 0x64, 0x64, 0x72, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x0e, 0x67, 0x61, 0x6d, 0x65, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x41, 0x64, 0x64,
	0x72, 0x32, 0x9f, 0x03, 0x0a, 0x12, 0x4d, 0x61, 0x74, 0x63, 0x68, 0x6d, 0x61, 0x6b, 0x69, 0x6e,
	0x67, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x41, 0x0a, 0x06, 0x45, 0x6e, 0x72, 0x6f,
	0x6c, 0x6c, 0x12, 0x1f, 0x2e, 0x6d, 0x61, 0x74, 0x63, 0x68, 0x6d, 0x61, 0x6b, 0x69, 0x6e, 0x67,
	0x2e, 0x4d, 0x61, 0x74, 0x63, 0x68, 0x6d, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x1a, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x12, 0x41, 0x0a, 0x06, 0x43,
	0x61, 0x6e, 0x63, 0x65, 0x6c, 0x12, 0x1f, 0x2e, 0x6d, 0x61, 0x74, 0x63, 0x68, 0x6d, 0x61, 0x6b,
	0x69, 0x6e, 0x67, 0x2e, 0x4d, 0x61, 0x74, 0x63, 0x68, 0x6d, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x12, 0x5b,
	0x0a, 0x15, 0x47, 0x65, 0x74, 0x57, 0x61, 0x69, 0x74, 0x69, 0x6e, 0x67, 0x50, 0x6c, 0x61, 0x79,
	0x65, 0x72, 0x43, 0x6f, 0x75, 0x6e, 0x74, 0x12, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x1a,
	0x2a, 0x2e, 0x6d, 0x61, 0x74, 0x63, 0x68, 0x6d, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x2e, 0x47, 0x65,
	0x74, 0x57, 0x61, 0x69, 0x74, 0x69, 0x6e, 0x67, 0x50, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x43, 0x6f,
	0x75, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x42, 0x0a, 0x0e, 0x53,
	0x75, 0x62, 0x73, 0x63, 0x72, 0x69, 0x62, 0x65, 0x4d, 0x61, 0x74, 0x63, 0x68, 0x12, 0x1f, 0x2e,
	0x6d, 0x61, 0x74, 0x63, 0x68, 0x6d, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x2e, 0x4d, 0x61, 0x74, 0x63,
	0x68, 0x6d, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x0d,
	0x2e, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x30, 0x01, 0x12,
	0x62, 0x0a, 0x11, 0x47, 0x65, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72,
	0x41, 0x64, 0x64, 0x72, 0x12, 0x25, 0x2e, 0x6d, 0x61, 0x74, 0x63, 0x68, 0x6d, 0x61, 0x6b, 0x69,
	0x6e, 0x67, 0x2e, 0x47, 0x65, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72,
	0x41, 0x64, 0x64, 0x72, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x26, 0x2e, 0x6d, 0x61,
	0x74, 0x63, 0x68, 0x6d, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x2e, 0x47, 0x65, 0x74, 0x47, 0x61, 0x6d,
	0x65, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x41, 0x64, 0x64, 0x72, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x42, 0x3d, 0x5a, 0x3b, 0x61, 0x72, 0x74, 0x79, 0x6f, 0x6d, 0x6c, 0x69, 0x6f,
	0x75, 0x2f, 0x78, 0x65, 0x6e, 0x6f, 0x62, 0x6c, 0x61, 0x73, 0x74, 0x2d, 0x62, 0x61, 0x63, 0x6b,
	0x65, 0x6e, 0x64, 0x2f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x6e, 0x61, 0x6c, 0x2f, 0x70, 0x6b, 0x67,
	0x5f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6d, 0x61, 0x74, 0x63, 0x68, 0x6d, 0x61, 0x6b, 0x69,
	0x6e, 0x67, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_matchmaking_proto_rawDescOnce sync.Once
	file_matchmaking_proto_rawDescData = file_matchmaking_proto_rawDesc
)

func file_matchmaking_proto_rawDescGZIP() []byte {
	file_matchmaking_proto_rawDescOnce.Do(func() {
		file_matchmaking_proto_rawDescData = protoimpl.X.CompressGZIP(file_matchmaking_proto_rawDescData)
	})
	return file_matchmaking_proto_rawDescData
}

var file_matchmaking_proto_msgTypes = make([]protoimpl.MessageInfo, 4)
var file_matchmaking_proto_goTypes = []any{
	(*MatchmakingRequest)(nil),            // 0: matchmaking.MatchmakingRequest
	(*GetWaitingPlayerCountResponse)(nil), // 1: matchmaking.GetWaitingPlayerCountResponse
	(*GetGameServerAddrRequest)(nil),      // 2: matchmaking.GetGameServerAddrRequest
	(*GetGameServerAddrResponse)(nil),     // 3: matchmaking.GetGameServerAddrResponse
	(*empty.Empty)(nil),                   // 4: google.protobuf.Empty
	(*pkg_proto.Event)(nil),               // 5: common.Event
}
var file_matchmaking_proto_depIdxs = []int32{
	0, // 0: matchmaking.MatchmakingService.Enroll:input_type -> matchmaking.MatchmakingRequest
	0, // 1: matchmaking.MatchmakingService.Cancel:input_type -> matchmaking.MatchmakingRequest
	4, // 2: matchmaking.MatchmakingService.GetWaitingPlayerCount:input_type -> google.protobuf.Empty
	0, // 3: matchmaking.MatchmakingService.SubscribeMatch:input_type -> matchmaking.MatchmakingRequest
	2, // 4: matchmaking.MatchmakingService.GetGameServerAddr:input_type -> matchmaking.GetGameServerAddrRequest
	4, // 5: matchmaking.MatchmakingService.Enroll:output_type -> google.protobuf.Empty
	4, // 6: matchmaking.MatchmakingService.Cancel:output_type -> google.protobuf.Empty
	1, // 7: matchmaking.MatchmakingService.GetWaitingPlayerCount:output_type -> matchmaking.GetWaitingPlayerCountResponse
	5, // 8: matchmaking.MatchmakingService.SubscribeMatch:output_type -> common.Event
	3, // 9: matchmaking.MatchmakingService.GetGameServerAddr:output_type -> matchmaking.GetGameServerAddrResponse
	5, // [5:10] is the sub-list for method output_type
	0, // [0:5] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_matchmaking_proto_init() }
func file_matchmaking_proto_init() {
	if File_matchmaking_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_matchmaking_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   4,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_matchmaking_proto_goTypes,
		DependencyIndexes: file_matchmaking_proto_depIdxs,
		MessageInfos:      file_matchmaking_proto_msgTypes,
	}.Build()
	File_matchmaking_proto = out.File
	file_matchmaking_proto_rawDesc = nil
	file_matchmaking_proto_goTypes = nil
	file_matchmaking_proto_depIdxs = nil
}
