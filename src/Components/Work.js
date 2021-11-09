import React from 'react'
import styled from 'styled-components'
import SectionTitle from './SectionTitle'
import ProjectCard from './ProjectCard'

const Work = () => {
    return (
        <Wrapper>
            <SectionTitle
                rightTitle = 'Work'
            />
            <Wrap>
                <ProjectCard
                    link = ''
                    title = 'littlebit'
                    summary = 'Bitcoin library from scratch'
                    tags = {['Python', 'Rust']}
                />
            </Wrap>
        </Wrapper>
    )
}

export default Work

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-gap: 30px;
    margin-left: -30px;
    padding: 10px 0 15px 0;
    margin-bottom: 10px;
`

const Wrap = styled.div`
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
    -webkit-column-gap: 15px;
    -moz-column-gap: 15px;
    column-gap: 15px;
    -webkit-column-fill: auto;
    -moz-column-fill: auto;
    column-fill: auto;

    @media (max-width: 768px) {
        -webkit-column-count: 1;
        -moz-column-count: 1;
        column-count: 1;
    }
`
