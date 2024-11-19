import React from 'react'
import styled from 'styled-components'

const Container = styled.footer`
    position: fixed;
    transform: translate(0, -100%);
    width: 100%;
    background-color: #30210589;
    z-index: 3;
    color: rgb(239, 144, 60);
    
`

export const Footer = () => {
  return (
    <Container>
        Still under development
    </Container>
  )
}
