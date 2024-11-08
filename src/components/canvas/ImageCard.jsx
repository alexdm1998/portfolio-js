import React from 'react'
import styled from 'styled-components'


const Padding = styled.div`
  padding-inline: 12px;
`

const Card = styled.div`
  border-radius: 1rem;
  border: 1px solid #d8d8d855;
  overflow: hidden;
  background-color: #c3bfbf12;
  box-shadow: 0.25rem .25rem .75rem rgba(0, 0, 0, 0.185);
`

const Image = styled.img`
  width: 100%;
  height: 200px;
  position: relative;
  display: flex;
  object-fit: cover;
`

const Details = styled.div`
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