import styled, { keyframes } from "styled-components";

const PulseAnimation = (dilation) => keyframes`
    0%{
        width: 100%;
        height: 100%;
        opacity: 1;
    }
    100%{
        width: ${dilation || 115}%;
        height: ${dilation || 115}%;
        opacity: 0;
    }
`;

const Highlight = styled.div`
  background-color: transparent;
  border: 1px #ffffff solid;
  border-radius: 50%;
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: ${(props) => PulseAnimation(props.$dilation)} 1.2s
    cubic-bezier(0.5, 1, 0.89, 1) 10 forwards;
`;

export const CelestialExperience = ({ dilation, isLearned }) => {
  return <>{!isLearned && <Highlight $dilation={dilation}></Highlight>}</>;
};
