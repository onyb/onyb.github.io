import styled from 'styled-components'

import Section from './section'

const Timeline = ({ year, children }) => {
  return (
    <Wrapper>
      <Section title={year} />
      <Wrap>{children}</Wrap>
    </Wrapper>
  )
}

export default Timeline

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-gap: 30px;
  margin-left: -30px;
  padding: 0 0 15px 0;
`

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`
