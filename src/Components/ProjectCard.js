import React from 'react'
import styled from 'styled-components'
import Tag from './Tag'

const ProjectCard = () => {
    return (
        <div>
            <Wrap>
                <Title>littlebit</Title>
                <Summary>Bitcoin library from scratch</Summary>
                <Tags>
                    <Tag></Tag>
                    <Tag></Tag>
                </Tags>
            </Wrap>
        </div>
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
