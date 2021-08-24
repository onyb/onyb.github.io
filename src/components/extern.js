import React from "react"
import styled from "styled-components"

const Tag = styled.span`
  text-transform: lowercase;
  font-size: smaller;
`

const items = [
  {
    date: "July, 2021",
    tags: ["talk"],
    title: "Browsers3000 – A Brave New Wallet",
    href: "https://blog.ipfs.io/brave-new-wallet",
  },
  {
    date: "Apr 10, 2021",
    tags: ["series"],
    title: "#30DaysOfBitcoin",
    href: "https://twitter.com/onybose/status/1380719582516715525",
  },
  {
    date: "Mar 24, 2021",
    tags: ["talk"],
    title: "DevBreak – Let's talk elliptic curves and bitcoin",
    href:
      "https://www.devbreak.io/workshop/lets-talk-elliptic-curves-and-bitcoin",
  },
  {
    date: "Jan 09, 2020",
    tags: ["workshop"],
    title: "Paris P2P Festival – Demystifying the cryptography behind bitcoin",
    href: "https://onyb.gitbook.io/secp256k1-python",
  },
  {
    date: "Sep 20, 2019",
    tags: ["talk"],
    title: "ESoWC Day @ ECMWF – ecPoint-Calibrate",
    href:
      "https://docs.google.com/presentation/d/1NcAI7ZV6s0VCdKMS6SdXfGcSH5pHPhlH9drzJx0x4YU/edit?usp=sharing",
  },
  {
    date: "Feb 20, 2018",
    tags: ["talk"],
    title: "Django Paris – reobject",
    href: "http://slides.com/onyb/reobject",
  },
]

const Extern = () => (
  <>
    <h5>Extern</h5>
    <ul>
      {items.map((item, idx) => (
        <li key={idx}>
          <div className="post-date code">
            <small>{item.date}</small>
          </div>
          <div className="title">
            {item.tags.map((tag, idx) => (
              <>
                <Tag key={idx} className="code">
                  [{tag}]
                </Tag>{" "}
              </>
            ))}
            <a href={item.href}>{item.title}</a>
          </div>
        </li>
      ))}
    </ul>
  </>
)

export default Extern
