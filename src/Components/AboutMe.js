import React from 'react'
import styled from 'styled-components'
import SectionTitle from './SectionTitle'

const AboutMe = () => {
    return (
        <Wrapper>
            <SectionTitle
                rightTitle = 'About Me'
            />
            <About>
                <p>Hey there, I'm Ani! Welcome to my personal website. This space is work-in-progress, but while you're here, I would like to share a few things about who I am, and what I do.</p>
                <p>I am a strong proponent of freedom currencies. My mission is to do my part in the grand democratization of money, which I'm convinced is the next phase of our civilization. I spent 5 years working in love-city Paris, most notably on cryptocurrencies, and recently moved to Bangalore for filter coffee, dosas, and in search of a local community that aligns with my mission.</p>
                <p>Currently, I'm a Wallet Engineer at Brave, where I'm building an internet-scale native crypto wallet. Previously, I worked at Ledger building a cryptocurrency custody product for financial institutions securing billions of dollars in assets.</p>
            </About>
        </Wrapper>
    )
}

export default AboutMe

const About = styled.div`
    color: var(--dark-gray);

    & p {
        letter-spacing: .05rem;
        line-height: 1.5rem;
    }
    & p:first-child {
        padding-top: 0;
        margin-top: 0;
    }
`

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-gap: 30px;
    margin-left: -30px;
    padding: 20px 0;
`
