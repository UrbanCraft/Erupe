package mhfpacket

import (
	"errors"

	"github.com/Andoryuuta/Erupe/network"
	"github.com/Andoryuuta/Erupe/network/clientctx"
	"github.com/Andoryuuta/byteframe"
)

// MsgSysDeleteSemaphore represents the MSG_SYS_DELETE_SEMAPHORE
type MsgSysDeleteSemaphore struct {
	AckHandle uint32
}

// Opcode returns the ID associated with this packet type.
func (m *MsgSysDeleteSemaphore) Opcode() network.PacketID {
	return network.MSG_SYS_DELETE_SEMAPHORE
}

// Parse parses the packet from binary
func (m *MsgSysDeleteSemaphore) Parse(bf *byteframe.ByteFrame, ctx *clientctx.ClientContext) error {
	m.AckHandle = bf.ReadUint32()
	return nil
}

// Build builds a binary packet from the current data.
func (m *MsgSysDeleteSemaphore) Build(bf *byteframe.ByteFrame, ctx *clientctx.ClientContext) error {
	return errors.New("Not implemented")
}
