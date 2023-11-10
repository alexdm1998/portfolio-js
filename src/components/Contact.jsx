import React from 'react'
import { ViewFrame, TransPanel } from './ViewFrame.style'
import styled from 'styled-components'


const Container = styled.div`
    padding: 5vh;
`

const Contact = () => {
  return (
    <ViewFrame>
        <TransPanel>
            <Container>
                Contact
            </Container>
        </TransPanel>
    </ViewFrame>
  )
}

export default Contact