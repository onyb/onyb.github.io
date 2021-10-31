import React from 'react'
import styled from 'styled-components'

const Header = () => {
return (
        <div>
            <Name>Anirudha Bose</Name>
        </div>
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
`
