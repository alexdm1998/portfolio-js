import React from 'react'
import { TransPanel, ViewFrame } from './ViewFrame.style'
import styled from 'styled-components'


const Container = styled.div`
    padding: 5vh;
`


const Gallery = () => {
  return (
    <ViewFrame>
        <TransPanel>
            <Container>
                Gallery
            </Container>
        </TransPanel>
    </ViewFrame>
  )
}

export default Gallery