import React from 'react'
import styled from 'styled-components'

const Tag = () => {
    return (
        <Wrap>Talk</Wrap>
    )
}

export default Tag

const Wrap = styled.div`
    color: var(--lighter-gray);
    padding: 2px 12px;
    border-radius: 20px;
    background-color: var(--light-gary);
    display: inline-block;
`
