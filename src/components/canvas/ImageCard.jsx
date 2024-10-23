import React from 'react'
import styled from 'styled-components'


const Padding = styled.div`
  padding-inline: 12px;
`

const Card = styled.div`
  border-radius: 1rem;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: 200px;
  position: relative;
  display: flex;
  object-fit: cover;
  box-shadow: 0.25rem .25rem .75rem rgba(0, 0, 0, .05);
`

const Details = styled.div`
  background-color: black;
  height: 20px;
`

export const ImageCard = ({url}) => {
  return (
    <Padding>
      <Card>
        <Image src={url}></Image>
        <Details></Details>
      </Card>
    </Padding>
  )
}