package mhfpacket

import (
	"errors"

	"github.com/Andoryuuta/Erupe/network"
	"github.com/Andoryuuta/Erupe/network/clientctx"
	"github.com/Andoryuuta/byteframe"
)

// MsgMhfEnumerateGuildTresure represents the MSG_MHF_ENUMERATE_GUILD_TRESURE
type MsgMhfEnumerateGuildTresure struct {
	AckHandle uint32
	Unk0      uint16
	Unk1      uint32
}

// Opcode returns the ID associated with this packet type.
func (m *MsgMhfEnumerateGuildTresure) Opcode() network.PacketID {
	return network.MSG_MHF_ENUMERATE_GUILD_TRESURE
}

// Parse parses the packet from binary
func (m *MsgMhfEnumerateGuildTresure) Parse(bf *byteframe.ByteFrame, ctx *clientctx.ClientContext) error {
	m.AckHandle = bf.ReadUint32()
	m.Unk0 = bf.ReadUint16()
	m.Unk1 = bf.ReadUint32()
	return nil
}

// Build builds a binary packet from the current data.
func (m *MsgMhfEnumerateGuildTresure) Build(bf *byteframe.ByteFrame, ctx *clientctx.ClientContext) error {
	return errors.New("Not implemented")
}
