import styled from 'styled-components'

import Tag from './tag'

const TimelineCard = ({ link, title, tags, image, children }) => {
  return (
    <LinkWrap>
      <a href={link}>
        <Card>
          <Wrap>
            <Title>{title}</Title>
            <Summary>{children}</Summary>
            <Tags>
              {tags.map((tag, idx) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
            </Tags>
          </Wrap>
          {image && <Image img={image} />}
        </Card>
      </a>
    </LinkWrap>
  )
}

export default TimelineCard

const LinkWrap = styled.div`
  & a {
    text-decoration: none;
  }
`

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px;
  grid-gap: 20px;
  background-color: var(--medium-gray);
  color: var(--dark-gray);
  padding: 15px;
  letter-spacing: 0.05rem;
  margin-bottom: 15px;
  background-color: var(--lighter-gray);
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  /*box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5); */

  & :last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    border-radius: 10px;
  }
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
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
  background-image: url(${(props) => props.img});

  @media (max-width: 768px) {
    border-radius: 5px;
  }
`
