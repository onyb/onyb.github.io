#!/usr/bin/env python

# Copyright (c) 2021 Anirudha Bose
#
# Use of this source code is governed by an ISC license that can be found
# here: https://opensource.org/licenses/ISC

from enum import IntFlag, auto
from dataclasses import dataclass
from ipaddress import IPv4Address, IPv6Address
from typing import Union


# ServiceFlag identifies services supported by a bitcoin peer.
class ServiceFlag(IntFlag):
    # NODE_NETWORK is a flag used to indicate a peer is a full node.
    # These peers can be asked for full blocks instead of just block headers.
    #
    # Service bit: 0 (0x001)
    NODE_NETWORK = auto()

    # NODE_GETUTXO is a flag used to indicate a peer supports the
    # getutxos and utxos commands (BIP 0064).
    #
    # Service bit: 1 (0x002)
    NODE_GETUTXO = auto()

    # NODE_BLOOM is a flag used to indicate a peer supports bloom filtering.
    # (BIP 0111)
    #
    # Service bit: 2 (0x004)
    NODE_BLOOM = auto()

    # NODE_WITNESS is a flag used to indicate a peer supports blocks and
    # transactions including witness data (BIP 0144).
    #
    # Service bit: 3 (0x008)
    NODE_WITNESS = auto()

    # NODE_XTHIN is a flag used to indicate a peer supports xthin blocks.
    #
    # Never formally proposed (as a BIP), and discontinued. Was historically
    # sporadically seen on the network.
    #
    # Service bit: 4 (0x010)
    NODE_XTHIN = auto()

    # NODE_BIT5 is a flag reserved for future use.
    #
    # Service bit: 5 (0x020)
    NODE_BIT5 = auto()

    # NODE_COMPACT_FILTERS is a flag used to indicate a peer supports Compact
    # Filters (BIP 0157).
    #
    # Service bit: 6 (0x040)
    NODE_COMPACT_FILTERS = auto()

    # NODE_BIT7 is a flag reserved for future use.
    #
    # In the past, this service flag was used to indicate that a peer is
    # running the (now abandoned) Segwit2X software.
    #
    # Service bit: 7 (0x080)
    NODE_BIT7 = auto()
    Node_SEGWIT2X = NODE_BIT7

    # NODE_BIT8 is a flag reserved for future use.
    #
    # Service bit: 8 (0x100)
    NODE_BIT8 = auto()

    # NODE_BIT9 is a flag reserved for future use.
    #
    # Service bit: 9 (0x100)
    NODE_BIT9 = auto()

    # NODE_NETWORK_LIMITED is a flag to allow pruned peers to signal their
    # limited services (BIP 0159).
    #
    # If signaled, the peer MUST be capable of serving at least the last 288
    # blocks (~2 days).
    #
    # Service bit: 10 (0x400)
    NODE_NETWORK_LIMITED = auto()


# When a network address is needed somewhere, this structure is used.
#
# This data structure should only be used with MsgVersion. For all other
# messages, NetAddress contains a 4-byte timestamp field.
@dataclass
class NetAddress:
    # services indicates the bitfield which identifies the enabled services
    # supported by the address.
    services: ServiceFlag

    # IP address of the peer, encoded in network byte order (big endian).
    #
    # In case of an IPv4 address, it is encoded as a 16-byte IPv4-mapped IPv6
    # address, i.e., only the last 4 bytes are read.
    #   (00 00 00 00 00 00 00 00 00 00 FF FF) ++ (4-byte IPv4 address)
    ip: Union[IPv4Address, IPv6Address]

    # Port the peer is using, encoded in network byte order (big endian) on
    # the wire.
    port: int


# Common fields for all protocol versions:
# ┌─────────┬──────────┬───────────┬───────────┐
# │ version │ services │ timestamp │ addr_recv │
# │ 4 bytes │ 8 bytes  │ 8 bytes   │ 26 bytes  │
# └─────────┴──────────┴───────────┴───────────┘
#
# Fields for protocol versions ≥ 106:
# ┌─────┬───────────┬─────────┬────────────┬──────────────┐
# │ ... │ addr_from │ nonce   │ user_agent │ start_height │
# │ ... │ 26 bytes  │ 8 bytes │ var str    │ 4 bytes      │
# └─────┴───────────┴─────────┴────────────┴──────────────┘
#
# Fields for protocol versions ≥ 70001:
# ┌─────┬────────┐
# │ ... │ relay  │
# │ ... │ 1 byte │
# └─────┴────────┘
@dataclass
class MsgVersion:
    # version indicates the version of the protocol the node is using.
    version: int

    # services indicates the bitfield which identifies the enabled services
    # for the connection.
    services: ServiceFlag

    # timestamp indicates the UNIX timestamp (in seconds) when the message was
    # generated.
    timestamp: int

    # The network address of the node receiving this message (remote peer).
    addr_recv: NetAddress

    # The network address of the node emitting this message (local peer).
    addr_from: NetAddress

    # Unique value associated with message that is used to detect self
    # connections.
    nonce: int

