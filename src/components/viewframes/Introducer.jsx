import React from 'react'
import { ViewFrame, TransPanel } from './ViewFrame.style'
import styled from 'styled-components'
import {Tooltip} from '../Tooltip.jsx'

const Container = styled.div`
    padding: 5vh;
`

const Introducer = () => {
  return (
    <ViewFrame>
        <TransPanel>
            <Container>
                <h1>Alex • 26</h1>
                This website serves as a portfolio for the knowledge and skills I've acquired throughout my years.
                Starting on Java, the first major programming language that made <Tooltip>me</Tooltip> design software in a object-oriented manner.
                Then, following it up with Javascript, I learned both front-end and back-end development and how the two should operate together, with it also learning HTML, CSS and NodeJS.
            </Container>
        </TransPanel>
    </ViewFrame>
  )
}

export default Introducer