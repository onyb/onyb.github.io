import React from 'react'
import styled from 'styled-components'

const Header = () => {
return (
        <>
            <Name>Anirudha Bose</Name>
        </>
    )
}

export default Header

const Name = styled.div`
    background-color: var(--dark-gray);
    color: var(--lighter-gray);
    font-size: 1.6rem;
    letter-spacing: .2rem;
    text-transform: uppercase;
    padding: 10px 30px;
    user-select: none;
   -webkit-user-select: none;
   -khtml-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
`
