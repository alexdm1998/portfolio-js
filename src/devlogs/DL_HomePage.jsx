import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: inherit;
  position: relative;
  padding: 5% 10%;
  font-size: 0.8rem;
  box-sizing: border-box;;
`;

export const DL_HomePage = () => {
  return (
    <Container>
      <h1>Developer Logs</h1>
      <p>
        The following are some of my developer notes, which I consider important
        to further increase my understanding of frontend development, and
        valuable for the creation of this website as it is. They may prove
        useful for future occurrences of similar problems, so I decided to not
        only have them documented as a way to show some of the things I learned
        with this, but also as a way to quickly refresh my memory on these
        concepts whenever I might need to.
      </p>
      <p>
        They are loosely documented.
      </p>
    </Container>
  );
};
