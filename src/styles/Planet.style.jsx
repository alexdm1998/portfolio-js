import styled from "styled-components";


export const Planet = styled.div`
    position: absolute;
    border-radius: 50%;
    background-image: linear-gradient(to top right, black, #2f4a6c, #910000 80%, #c62b00 98%, #fe3700);
    background-size: 300% 300%;
    background-position: ${props => props.$isDarkMode === "light" ? "top right" : "bottom left"};
    outline: ${props => props.$isFocus ? "1px solid #ffffffb8" : ""};
    transition: background-position 5s;
`