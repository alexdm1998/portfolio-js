import styled from "styled-components";

export const ViewFrame = styled.div`
    height: 100vh;
    width: 100vw;
    scroll-snap-align: center;
    display:flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 3;
`
export const TransPanel = styled.div`
    width: 80%;
    height: 80%;
    background-image: radial-gradient(#ffffff40, #ffffff20);
    border-radius: 8vh;
    position: relative;
    z-index: 3;
`