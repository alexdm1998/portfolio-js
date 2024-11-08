import React, { useEffect } from "react";
import styled from "styled-components";
import { ImageCard } from "./ImageCard";

const Grid = styled.div`
  position: absolute;
  left: 1%;
  top: 30%;
  width: 35%;
  height: 70%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow-y: scroll;
  scrollbar-width: none;
  mask-image: linear-gradient(to bottom, transparent 0%, #000000c2 10%);
`;

const GridColumn = styled.div`
  height: 100%;
  display: grid;
  align-content: start;

  row-gap: 10px;
  
  &:nth-child(2){
    transform: translateY(calc(2%));
  }
`;

export const CapitalCollage = ({ capitalImages }) => {
  useEffect(() => {
    console.log("Hereyo");
    console.log(capitalImages);
  }, [capitalImages]);

  return (
    <Grid>
      <GridColumn>
        {capitalImages.length > 0 &&
          capitalImages.map((capitalImages, index) => {
            if (index % 2 == 0) {
              return (
                <ImageCard key={index} url={capitalImages.url}></ImageCard>
              );
            }
          })}
      </GridColumn>
      <GridColumn>
        {capitalImages.length > 1 &&
          capitalImages.map((capitalImages, index) => {
            if (index % 2 == 1) {
              return (
                <ImageCard key={index} url={capitalImages.url}></ImageCard>
              );
            }
          })}
      </GridColumn>
     {/*  <GridColumn>
        {capitalImages.length > 2 &&
          capitalImages.map((capitalImages, index) => {
            if (index % 3 == 2) {
              return (
                <ImageCard key={index} url={capitalImages.url}></ImageCard>
              );
            }
          })}
      </GridColumn> */}
    </Grid>
  );
};
