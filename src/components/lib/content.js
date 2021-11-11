import styled from 'styled-components'

const Content = ({ children }) => {
  return (
    <Wrap>
      <Left />
      <Right>{children}</Right>
    </Wrap>
  )
}

export default Content

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  width: 40vw;
  max-width: 800px;

  @media (max-width: 768px) {
    width: 80vw;
  }
`

const Left = styled.div`
  background-color: var(--dark-gray);
`

const Right = styled.div``
