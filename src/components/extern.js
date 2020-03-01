import React from "react"
import styled from "styled-components"

const Tag = styled.span`
  text-transform: lowercase;
  font-size: smaller;
`

const Extern = () => (
  <>
    <h5>Extern</h5>
    <ul>
      <li>
        <div className="post-date code">
          <small>Jun 18, 2020</small>
        </div>
        <div className="title">
          <Tag className="code">[upcoming]</Tag>
          <Tag className="code">[workshop]</Tag>{" "}
          <a href="https://www.devbreak.io">
            DevBreak – Let's talk elliptic curves and bitcoin
          </a>
        </div>
      </li>

      <li>
        <div className="post-date code">
          <small>Jan 09, 2020</small>
        </div>
        <div className="title">
          <Tag className="code">[workshop]</Tag>{" "}
          <a href="https://onyb.gitbook.io/secp256k1-python">
            Paris P2P Festival – Demystifying the cryptography behind bitcoin
          </a>
        </div>
      </li>

      <li>
        <div className="post-date code">
          <small>Sep 20, 2019</small>
        </div>
        <div className="title">
          <Tag className="code">[talk]</Tag>{" "}
          <a href="https://docs.google.com/presentation/d/1NcAI7ZV6s0VCdKMS6SdXfGcSH5pHPhlH9drzJx0x4YU/edit?usp=sharing">
            ESoWC Day @ ECMWF – ecPoint-Calibrate
          </a>
        </div>
      </li>

      <li>
        <div className="post-date code">
          <small>Feb 20, 2018</small>
        </div>
        <div className="title">
          <Tag className="code">[talk]</Tag>{" "}
          <a href="http://slides.com/onyb/reobject">Django Paris – reobject</a>
        </div>
      </li>
    </ul>
  </>
)

export default Extern
