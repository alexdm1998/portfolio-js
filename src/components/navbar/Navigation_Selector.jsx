import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  color: #d8d8d8;
  font-family: "Montserrat";
  font-size: 0.75rem;
  letter-spacing: 0.2rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-family: inherit;
  letter-spacing: inherit;
  font-size: inherit;
`


export const Navigation_Selector = () => {
  return (
    <Container>
      <StyledLink to={"/DevLog"}>
        DevLog
      </StyledLink>
    </Container>
  )
}
