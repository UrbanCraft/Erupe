package mhfpacket

import (
	"errors"

	"github.com/Andoryuuta/Erupe/network"
	"github.com/Andoryuuta/Erupe/network/clientctx"
	"github.com/Andoryuuta/byteframe"
)

// MsgMhfGuildHuntdata represents the MSG_MHF_GUILD_HUNTDATA
type MsgMhfGuildHuntdata struct {
	AckHandle uint32
	Unk0      uint8
}

// Opcode returns the ID associated with this packet type.
func (m *MsgMhfGuildHuntdata) Opcode() network.PacketID {
	return network.MSG_MHF_GUILD_HUNTDATA
}

// Parse parses the packet from binary
func (m *MsgMhfGuildHuntdata) Parse(bf *byteframe.ByteFrame, ctx *clientctx.ClientContext) error {
	m.AckHandle = bf.ReadUint32()
	m.Unk0 = bf.ReadUint8()
	return nil
}

// Build builds a binary packet from the current data.
func (m *MsgMhfGuildHuntdata) Build(bf *byteframe.ByteFrame, ctx *clientctx.ClientContext) error {
	return errors.New("Not implemented")
}
