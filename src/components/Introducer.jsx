import React from 'react'
import { ViewFrame, TransPanel } from './ViewFrame.style'
import styled from 'styled-components'


const Container = styled.div`
    padding: 5vh;
`

const Introducer = () => {
  return (
    <ViewFrame>
        <TransPanel>
            <Container>
                Introducer
            </Container>
        </TransPanel>
    </ViewFrame>
  )
}

export default Introducer