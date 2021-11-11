import React from 'react'
import styled from 'styled-components'

import Section from './section'

const Segment = ({ title, children }) => {
  return (
    <Wrapper>
      <Section title={title} />
      <SegmentContent>{children}</SegmentContent>
    </Wrapper>
  )
}

export default Segment

const SegmentContent = styled.div`
  color: var(--dark-gray);

  & p {
    letter-spacing: 0.05rem;
    line-height: 1.5rem;
  }
  & p:first-child {
    padding-top: 0;
    margin-top: 0;
  }
`

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-gap: 30px;
  margin-left: -30px;
  padding: 20px 0;
`
