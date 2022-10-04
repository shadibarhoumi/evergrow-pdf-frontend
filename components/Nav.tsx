import styled from 'styled-components'

export const Nav = () => {
  return (
    <Wrapper>
      <Logo>Evergrow</Logo>
    </Wrapper>
  )
}

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: serif;
`

const Wrapper = styled.nav`
  padding: 24px;
  color: white;
  background-color: var(--chakra-colors-teal-600);
`
