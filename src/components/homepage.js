import React from 'react'

import Work from './lib/work'
import ContentWrapper from './lib/content'
import Segment from './lib/segment'
import Timeline from './lib/timeline'
import TimelineCard from './lib/timeline-card'
import WorkCard from './lib/work-card'
import Header from './lib/header'

const Homepage = () => {
  return (
    <>
      <Header>Anirudha Bose</Header>
      <ContentWrapper>
        <Segment title="About Me">
          <p>
            Hey there, I'm Ani! Welcome to my personal website. This space is
            work-in-progress, but while you're here, I would like to share a few
            things about who I am, and what I do.
          </p>
          <p>
            I am a strong proponent of freedom currencies. My mission is to do
            my part in the grand democratization of money, which I'm convinced
            is the next phase of our civilization. I spent 5 years working in
            love-city Paris, most notably on cryptocurrencies, and recently
            moved to Bangalore for filter coffee, dosas, and in search of a
            local community that aligns with my mission.
          </p>
          <p>
            Currently, I'm a Wallet Engineer at{' '}
            <a href="https://brave.com/" target="_blank">
              Brave
            </a>
            , where I'm building an internet-scale native crypto wallet.
            Previously, I worked at{' '}
            <a href="https://ledger.com/" target="_blank" rel="noreferrer">
              Ledger
            </a>{' '}
            building a cryptocurrency custody product for financial institutions
            securing billions of dollars in assets.
          </p>
        </Segment>
        <Timeline year="2021">
          <TimelineCard
            link=""
            title="Filecoin Orbit - Web3 browsers"
            tags={['talk']}
            image="https://pbs.twimg.com/media/FCQE3dKVcAAfv0Z?format=jpg&name=4096x4096"
          >
            Panel discussion with Dietrich Ayala about browsers, web3, wallets,
            and everything in between.
          </TimelineCard>
          <TimelineCard
            link="https://blog.ipfs.io/brave-new-wallet"
            title="Browsers3000 – A Brave New Wallet"
            tags={['talk']}
            image="https://i.ytimg.com/vi/-4ujo7q3LWw/maxresdefault.jpg"
          >
            On the future of Brave Wallet and the Brave browser's use of IPFS.
          </TimelineCard>

          <TimelineCard
            link="https://twitter.com/onybose/status/1380719582516715525"
            title="#30DaysOfBitcoin"
            tags={['series']}
            image="https://pbs.twimg.com/media/Eyk57lXVcAAGugA?format=jpg&name=large"
          >
            #30DaysOfBitcoin challenge to learn, document, build, and deep-dive
            into Bitcoin over the summers.
          </TimelineCard>

          <TimelineCard
            link="https://www.devbreak.io/workshop/lets-talk-elliptic-curves-and-bitcoin"
            title="DevBreak – Let's talk elliptic curves and bitcoin"
            tags={['talk']}
            image="https://assets.website-files.com/5dd055b1edfe6a956067785d/6050a7aa5a0665d92c1fa41e_ledger%204.png"
          >
            Understanding elliptic curves as basic building blocks of Bitcoin.
          </TimelineCard>
        </Timeline>
        <Timeline year="2020">
          <TimelineCard
            link="https://onyb.gitbook.io/secp256k1-python"
            title="Paris P2P Festival – Demystifying the cryptography behind bitcoin"
            tags={['workshop']}
            image="https://camo.githubusercontent.com/d55e7ed59e51aa6db8966a83241102dffecf73d1ab846f156909b393344b0347/68747470733a2f2f7032702e70617269732f696d672f70617269735f7032702e737667"
          >
            Workshop on elliptic curve cryptography with focus on secp256k1
            curve.
          </TimelineCard>
        </Timeline>

        <Timeline year="2019">
          <TimelineCard
            link="https://docs.google.com/presentation/d/1NcAI7ZV6s0VCdKMS6SdXfGcSH5pHPhlH9drzJx0x4YU/edit?usp=sharing"
            title="ESoWC Day @ ECMWF – ecPoint-Calibrate"
            tags={['talk']}
            image="https://www.ecmwf.int/sites/default/files/ECMWF_Master_Logo_RGB_nostrap.png"
          >
            Presented ecPoint-Calibrate - an interactive GUI for calibration and
            conditional verification of numerical weather prediction model
            outputs.
          </TimelineCard>
        </Timeline>

        <Timeline year="2018">
          <TimelineCard
            link="http://slides.com/onyb/reobject"
            title="Django Paris - reobject"
            tags={['talk']}
            image="data:image/jpeg;base64,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"
          >
            Presented an ORM layer for Python objects, inspired by Django.
          </TimelineCard>
        </Timeline>
        <Work title="Work">
          <WorkCard
            link="https://github.com/ledgerhq/satstack"
            title="satstack"
            tags={['bitcoin', 'golang']}
          >
            Trustless Bitcoin full node bridge with Ledger Live.
          </WorkCard>

          <WorkCard
            link="https://github.com/onyb/littlebit"
            title="littlebit"
            tags={['bitcoin']}
          >
            Bitcoin library from scratch; in Python and Rust.
          </WorkCard>
          <WorkCard
            link="https://github.com/esowc/ecPoint-Calibrate"
            title="ecPoint-Calibrate"
            tags={['weather', 'python', 'ECMWF']}
          >
            Interactive meteorological software for calibration of model
            outputs, post-processing, and conditional-verification. Development
            sponsored by <a href="https://ecmwf.int/">ECMWF</a>.
          </WorkCard>
          <WorkCard
            link="https://github.com/onyb/reobject"
            title="reobject"
            tags={['python']}
          >
            An ORM layer to track and query objects at runtime, using a familiar
            query language inspired by Django.
          </WorkCard>
          <WorkCard
            link="https://github.com/cerndb/hloader"
            title="HLoader"
            tags={['python', 'CERN']}
          >
            Data-ingestion tool to manage jobs from CMS data-services, into
            Hadoop clusters. Development sponsored by{' '}
            <a href="https://home.cern/">CERN</a>.
          </WorkCard>

          <WorkCard
            link="https://nbviewer.jupyter.org/gist/onyb/ede8693213b4e783e22f"
            title="Grover's Search"
            tags={['python', 'quantum computing']}
          >
            Classical simulation of Grover's Quantum Search algorithm.
            Development sponsored by <a href="http://www.hri.res.in/">HRI</a>.
          </WorkCard>
        </Work>
      </ContentWrapper>
    </>
  )
}

export default Homepage
