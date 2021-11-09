import React from 'react'
import styled from 'styled-components'
import SectionTitle from './SectionTitle'
import TimelineCard from './TimelineCard'

const Year = ({year}) => {
    return (
        <Wrapper>
            <SectionTitle
                rightTitle = {year}
            />
            <Wrap>
                <TimelineCard></TimelineCard>
                <TimelineCard></TimelineCard>
            </Wrap>
        </Wrapper>
    )
}

export default Year

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-gap: 30px;
    margin-left: -30px;
    padding: 0 0 15px 0;
`

const Wrap = styled.div`
    display: grid;
    grid-template-columns: 1fr;
`
