import styled from "styled-components";

export const HoverScaleWrapper = styled.div` //The reason for this Wrapper, is that the transition affects only the scale transform
    height: inherit;                         //and not also other transforms that might happen outside this over. It also allows the
    transition: transform 0.5s;              //the modification of the scale factor across multiple components.
    
    &:hover {
        transform: scale(1.1);
    }
`