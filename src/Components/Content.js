import React from 'react'
import styled from 'styled-components'
import AboutMe from './AboutMe'
import Timeline from './Timeline'
import Work from './Work'

const Content = () => {
    return (
        <div>
            <Wrap>
                <Left />
                <Right>
                    <AboutMe />
                    <Timeline />
                    <Work />
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

    @media (max-width: 768px) {
        width: 80vw ;
    }
}
`
const Left = styled.div`
    background-color: var(--dark-gray);
`

const Right = styled.div``


