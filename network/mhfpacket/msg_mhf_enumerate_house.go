package mhfpacket

import (
	"github.com/Andoryuuta/Erupe/network"
	"github.com/Andoryuuta/Erupe/network/clientctx"
	"github.com/Andoryuuta/byteframe"
)

// MsgMhfEnumerateHouse represents the MSG_MHF_ENUMERATE_HOUSE
type MsgMhfEnumerateHouse struct {
	AckHandle uint32
	Unk0      uint8
	Unk1      uint32
	Player    uint8
	Unk2      uint16
}

// Opcode returns the ID associated with this packet type.
func (m *MsgMhfEnumerateHouse) Opcode() network.PacketID {
	return network.MSG_MHF_ENUMERATE_HOUSE
}

// Parse parses the packet from binary
func (m *MsgMhfEnumerateHouse) Parse(bf *byteframe.ByteFrame, ctx *clientctx.ClientContext) error {
	m.AckHandle = bf.ReadUint32()
	m.Unk0 = bf.ReadUint8()
	m.Unk1 = bf.ReadUint32()
	m.Player = bf.ReadUint8()
	m.Unk2 = bf.ReadUint16()
	return nil
}

// Build builds a binary packet from the current data.
func (m *MsgMhfEnumerateHouse) Build(bf *byteframe.ByteFrame, ctx *clientctx.ClientContext) error {
	bf.WriteUint32(m.AckHandle)
	bf.WriteUint8(m.Unk0)
	bf.WriteUint32(m.Unk1)
	bf.WriteUint8(m.Player)
	bf.WriteUint16(m.Unk2)
	return nil
}
