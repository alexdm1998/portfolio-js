import styled from "styled-components";


export const Planet = styled.div`
    position: absolute;
    border-radius: 50%;
    background-image: linear-gradient(to bottom right, black, #910000 55%, #c62b00);
    background-size: 200% 200%;
    background-position: ${props => props.$isDarkMode === "light" ? "bottom right" : "top left"};
    outline: ${props => props.$isFocus ? "1px solid #ffffffb8" : ""};
    transition: background-position 1s;
`