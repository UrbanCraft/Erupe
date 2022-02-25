package mhfpacket

import (
	"github.com/Andoryuuta/Erupe/network"
	"github.com/Andoryuuta/Erupe/network/clientctx"
	"github.com/Andoryuuta/byteframe"
)

// MsgMhfAcquireCafeItem represents the MSG_MHF_ACQUIRE_CAFE_ITEM
type MsgMhfAcquireCafeItem struct {
	AckHandle uint32
	// Valid sizes, not sure if [un]signed.
	ItemType  uint16
	ItemID    uint16
	Quant     uint16
	PointCost uint32
	Unk0      uint16
}

// Opcode returns the ID associated with this packet type.
func (m *MsgMhfAcquireCafeItem) Opcode() network.PacketID {
	return network.MSG_MHF_ACQUIRE_CAFE_ITEM
}

// Parse parses the packet from binary
func (m *MsgMhfAcquireCafeItem) Parse(bf *byteframe.ByteFrame, ctx *clientctx.ClientContext) error {
	m.AckHandle = bf.ReadUint32()
	m.ItemType = bf.ReadUint16()
	m.ItemID = bf.ReadUint16()
	m.Quant = bf.ReadUint16()
	m.PointCost = bf.ReadUint32()
	m.Unk0 = bf.ReadUint16()
	return nil
}

// Build builds a binary packet from the current data.
func (m *MsgMhfAcquireCafeItem) Build(bf *byteframe.ByteFrame, ctx *clientctx.ClientContext) error {
	bf.WriteUint32(m.AckHandle)
	bf.WriteUint16(m.ItemType)
	bf.WriteUint16(m.ItemID)
	bf.WriteUint16(m.Quant)
	bf.WriteUint32(m.PointCost)
	bf.WriteUint16(m.Unk0)
	return nil
}
