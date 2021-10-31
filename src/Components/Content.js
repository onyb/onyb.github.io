import React from 'react'
import styled from 'styled-components'
import AboutMe from './AboutMe'
import Timeline from './Timeline'

const Content = () => {
    return (
        <div>
            <Wrap>
                <Left />
                <Right>
                    <AboutMe />
                    <Timeline />
                </Right>
            </Wrap>
        </div>
    )
}

export default Content

const Wrap = styled.div`
    display: grid;
    grid-template-columns: 30px 1fr;
    width: 40vw;
    max-width: 800px;
`
const Left = styled.div`
    background-color: var(--dark-gray);
`

const Right = styled.div``
