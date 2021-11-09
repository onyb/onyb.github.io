import React from 'react'
import styled from 'styled-components'

const SectionTitle = ({rightTitle}) => {
    return (
        <div>
            <Title>
                <h1>{rightTitle}</h1>
            </Title>
        </div>
    )
}

export default SectionTitle

const Title = styled.div`
    writing-mode: tb-rl;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    white-space: nowrap;
    display: block;
    background-color: var(--dark-gray);
    user-select: none;
   -webkit-user-select: none;
   -khtml-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
    
    & h1 {
        line-height: 30px;
        color: var(--light-gray);
        font-size: 1rem;
        font-weight: 300;
        padding: 0;
        margin: 0;
        width: 100%;
    }
`
