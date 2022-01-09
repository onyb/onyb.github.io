#!/usr/bin/env python

# Copyright (c) 2021 Anirudha Bose
#
# Use of this source code is governed by an ISC license that can be found
# here: https://opensource.org/licenses/ISC

import unittest
from binascii import hexlify, unhexlify
from dataclasses import dataclass
from enum import IntFlag, auto
from ipaddress import IPv4Address, IPv6Address
from typing import Optional, Union

"""
This module implements MsgVersion, representing the wire message "version",
along with associated types.

MsgVersion is the first message to be advertised to peers when a node
creates an outgoing connection, making it essential for establishing a
communication channel between peers in the Bitcoin network.

Unit tests are provided at the end of the module.
"""


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


# NetAddress defines the network address of a connected peer, and the
# services it supports.
#
# This data structure should only be used with MsgVersion. For all other
# messages, NetAddress contains a 4-byte timestamp field.
#
# ┌──────────┬──────────┬─────────┐
# │ services │ IP       │ port    │
# │ 8 bytes  │ 16 bytes │ 2 bytes │
# └──────────┴──────────┴─────────┘
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

    # Constants
    _ipv4_prefix = (0x00000000000000000000FFFF).to_bytes(length=12, byteorder="big")

    def to_wire(self) -> bytes:
        """
        Encode a NetAddress instance to raw bytes following the wire protocol.

        See: https://en.bitcoin.it/wiki/Protocol_documentation#Network_address
        """

        services = self.services.value.to_bytes(length=8, byteorder="little")

        ip_prefix = b"" if isinstance(self.ip, IPv6Address) else self._ipv4_prefix
        ip = ip_prefix + self.ip.packed

        port = self.port.to_bytes(length=2, byteorder="big")

        return services + ip + port

    @classmethod
    def from_wire(cls, data: bytes) -> "NetAddress":
        """
        Decode raw wire bytes to a NetAddress instance.

        See: https://en.bitcoin.it/wiki/Protocol_documentation#Network_address
        """

        services = data[:8]
        services = ServiceFlag(int.from_bytes(services, byteorder="little"))
        data = data[8:]

        ip = data[:16]
        ip_cls = IPv4Address if ip.startswith(cls._ipv4_prefix) else IPv6Address
        ip = ip_cls(ip.lstrip(cls._ipv4_prefix) if ip_cls is IPv4Address else ip)
        data = data[16:]

        port = int.from_bytes(data, byteorder="big")

        return cls(services=services, ip=ip, port=port)


# MsgVersion represents a bitcoin version message. It is used for a peer to
# advertise itself as soon as an outbound connection is made.
#
# No further communication is possible until both peers have exchanged their
# version.
#
# Common fields for all protocol versions:
# ┌─────────┬──────────┬───────────┬───────────┐
# │ version │ services │ timestamp │ addr_recv │
# │ 4 bytes │ 8 bytes  │ 8 bytes   │ 26 bytes  │
# └─────────┴──────────┴───────────┴───────────┘
#
# Fields for protocol versions ≥ 106:
# ┌─────┬───────────┬─────────┬────────────┬──────────────┐
# │ ... │ addr_from │ nonce   │ user_agent │ start_height │
# │ ... │ 26 bytes  │ 8 bytes │ varstr     │ 4 bytes      │
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

    # The user agent that generated messsage, encoded as a varstr on the wire.
    # Max length: 256 characters
    user_agent: str

    # Last block seen by the generator of the version message.
    start_height: int

    # Whether the remote peer should announce relayed transactions or not.
    relay: Optional[bool]

    def to_wire(self) -> bytes:
        """
        Encode MsgVersion to raw bytes following the wire protocol.

        See: https://en.bitcoin.it/wiki/Protocol_documentation#version
        """
        version = self.version.to_bytes(length=4, byteorder="little")
        services = self.services.value.to_bytes(length=8, byteorder="little")

        timestamp = self.timestamp.to_bytes(length=8, byteorder="little")

        addr_recv = self.addr_recv.to_wire()
        addr_from = self.addr_from.to_wire()

        nonce = self.nonce.to_bytes(length=8, byteorder="little")

        user_agent = (
            b"00"
            if len(self.user_agent) == 0
            else (
                len(self.user_agent).to_bytes(length=1, byteorder="little")
                + bytes(self.user_agent, encoding="utf-8")
            )
        )

        start_height = self.start_height.to_bytes(length=4, byteorder="little")

        relay = (
            b"" if not self.relay else self.relay.to_bytes(length=1, byteorder="big")
        )

        return (
            version
            + services
            + timestamp
            + addr_recv
            + addr_from
            + nonce
            + user_agent
            + start_height
            + relay
        )

    @classmethod
    def from_wire(cls, data: bytes) -> "MsgVersion":
        """
        Decode raw wire bytes to a MsgVersion instance.

        See: https://en.bitcoin.it/wiki/Protocol_documentation#version
        """

        version = data[:4]
        version = int.from_bytes(version, byteorder="little")
        data = data[4:]

        services = data[:8]
        services = ServiceFlag(int.from_bytes(services, byteorder="little"))
        data = data[8:]

        timestamp = data[:8]
        timestamp = int.from_bytes(timestamp, byteorder="little")
        data = data[8:]

        addr_recv = data[:26]
        addr_recv = NetAddress.from_wire(addr_recv)
        addr_recv = NetAddress(
            services=services,
            ip=addr_recv.ip,
            port=8333,
        )
        data = data[26:]

        addr_from = data[:26]
        addr_from = NetAddress.from_wire(addr_from)
        addr_from = NetAddress(
            services=services,
            ip=addr_from.ip,
            port=8333,
        )
        data = data[26:]

        nonce = data[:8]
        nonce = int.from_bytes(nonce, byteorder="little")
        data = data[8:]

        ua_len = data[0]
        data = data[1:]
        user_agent = data[:ua_len].decode("utf-8")
        data = data[ua_len:]

        start_height = data[:4]
        start_height = int.from_bytes(start_height, byteorder="little")
        data = data[4:]

        relay = (
            None if data == b"" else (bool(int.from_bytes(data, byteorder="little")))
        )

        return cls(
            version=version,
            services=services,
            timestamp=timestamp,
            addr_recv=addr_recv,
            addr_from=addr_from,
            nonce=nonce,
            user_agent=user_agent,
            start_height=start_height,
            relay=relay,
        )


class TestNetAddress(unittest.TestCase):
    case = unhexlify(
        "0100000000000000"  # 1 (NODE_NETWORK)
        "00000000000000000000FFFF0A000001"  # IPv6: ::ffff:a00:1 or IPv4: 10.0.0.1
        "208D"  # Port 8333
    )

    def test_encode(self):
        addr = NetAddress(
            services=ServiceFlag.NODE_NETWORK, ip=IPv4Address("10.0.0.1"), port=8333
        )
        assert addr.to_wire() == self.case

    def test_decode(self):
        addr = NetAddress.from_wire(self.case)
        assert addr == NetAddress(
            services=ServiceFlag.NODE_NETWORK, ip=IPv4Address("10.0.0.1"), port=8333
        )


class TestMsgVersion(unittest.TestCase):
    case = unhexlify(
        "62EA0000"  # 60002 (protocol version 60002)
        "0100000000000000"  # 1 (NODE_NETWORK services)
        "11B2D05000000000"  # Tue Dec 18 10:12:33 PST 2012
        "010000000000000000000000000000000000FFFF0A000001208D"  # IPv6: ::ffff:a00:1 or IPv4: 10.0.0.1
        "010000000000000000000000000000000000FFFF0A000001208D"  # IPv6: ::ffff:a00:1 or IPv4: 10.0.0.1
        "3B2EB35D8CE61765"  # Nonce
        "0F2F5361746F7368693A302E372E322F"  # "/Satoshi:0.7.2/"
        "C03E0300"  # Last block sending node has is block #212672
    )

    def test_encode(self):
        addr = NetAddress(
            services=ServiceFlag.NODE_NETWORK, ip=IPv4Address("10.0.0.1"), port=8333
        )

        msg = MsgVersion(
            version=60002,
            services=ServiceFlag.NODE_NETWORK,
            timestamp=1355854353,
            addr_recv=addr,
            addr_from=addr,
            nonce=7284544412836900411,
            user_agent="/Satoshi:0.7.2/",
            start_height=212672,
            relay=None,
        )

        assert msg.to_wire() == self.case

    def test_decode(self):
        msg = MsgVersion.from_wire(self.case)
        addr = NetAddress(
            services=ServiceFlag.NODE_NETWORK, ip=IPv4Address("10.0.0.1"), port=8333
        )

        assert msg == MsgVersion(
            version=60002,
            services=ServiceFlag.NODE_NETWORK,
            timestamp=1355854353,
            addr_recv=addr,
            addr_from=addr,
            nonce=7284544412836900411,
            user_agent="/Satoshi:0.7.2/",
            start_height=212672,
            relay=None,
        ), msg


if __name__ == "__main__":
    unittest.main()
