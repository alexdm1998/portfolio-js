import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  font-family: inherit;
  position: relative;
  padding: 1% 4%;
  font-size: 0.8rem;
  box-sizing: border-box;
  text-align: justify;
`;


export const DL_Template = ({children}) => {
  return (
  <Container>
    {children}
  </Container>
  )
}