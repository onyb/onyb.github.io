import React from 'react'
import styled from 'styled-components'
import Tag from './Tag'

const ProjectCard = ({link, title, summary, tags}) => {
    console.log(tags)
    return (
        <div>
            <LinkWrap>
                <a href=''>
                    <Wrap>
                        <Title>{title}</Title>
                        <Summary>{summary}</Summary>
                        <Tags>
                            <Tag/>
                        </Tags>
                    </Wrap>
                </a>
            </LinkWrap>
        </div>
    )
}

export default ProjectCard

const LinkWrap = styled.div`
    & a {
        text-decoration: none;
    }
`

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
    padding: 15px;
    background-color: var(--lighter-gray);
    /* box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2); */
    box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);
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
