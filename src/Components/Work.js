import React from 'react'
import styled from 'styled-components'
import SectionTitle from './SectionTitle'
import ProjectCard from './ProjectCard'

const Work = () => {
    return (
        <div>
            <Wrapper>
                <SectionTitle></SectionTitle>
                <Wrap>
                    <ProjectCard></ProjectCard>
                    <ProjectCard></ProjectCard>
                </Wrap>
            </Wrapper>
        </div>
    )
}

export default Work

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-gap: 30px;
    margin-left: -30px;
    padding: 10px 0 15px 0;
`

const Wrap = styled.div`
    -webkit-column-count: 2;
    -webkit-column-gap: 1rem;
    -webkit-column-fill: auto;
    -moz-column-count: 2;
    -moz-column-gap: 1rem;
    -moz-column-fill: auto;
    column-count: 2;
    column-gap: 1rem;
    column-fill: auto;
`
