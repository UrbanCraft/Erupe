package mhfpacket

import (
	"github.com/Andoryuuta/Erupe/network"
	"github.com/Andoryuuta/byteframe"
)

// MsgMhfGetUdTacticsFirstQuestBonus represents the MSG_MHF_GET_UD_TACTICS_FIRST_QUEST_BONUS
type MsgMhfGetUdTacticsFirstQuestBonus struct{}

// Opcode returns the ID associated with this packet type.
func (m *MsgMhfGetUdTacticsFirstQuestBonus) Opcode() network.PacketID {
	return network.MSG_MHF_GET_UD_TACTICS_FIRST_QUEST_BONUS
}

// Parse parses the packet from binary
func (m *MsgMhfGetUdTacticsFirstQuestBonus) Parse(bf *byteframe.ByteFrame) error {
	panic("Not implemented")
}

// Build builds a binary packet from the current data.
func (m *MsgMhfGetUdTacticsFirstQuestBonus) Build(bf *byteframe.ByteFrame) error {
	panic("Not implemented")
}