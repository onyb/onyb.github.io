import React from 'react'
import styled from 'styled-components'
import Tag from './Tag'

const ProjectCard = ({link, title, summary, tags}) => {
    console.log(tags)
    return (
        <Wrap>
            <Title>{title}</Title>
            <Summary>{summary}</Summary>
            <Tags>
                <Tag/>
            </Tags>
        </Wrap>
    )
}

export default ProjectCard

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
    padding: 15px;
    background-color: var(--medium-gray);
    color: var(--dark-gray);
    -webkit-column-break-inside: avoid;
    -moz-column-break-inside: avoid;
    column-break-inside: avoid;
    margin-bottom: 15px;

    @media (max-width: 768px) {
        border-radius: 10px;
    }
`

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
`

const Summary = styled.div``

const Tags = styled.div`
    display: flex;
    gap: 10px;
`

const Image = styled.div`
    height: 100%;
    width: 150px;
    background-color: red;
`
