import styled from "styled-components";
import { ThreeCanvas } from "./Canvas";
import { RaycastProvider } from "@contexts/RaycastContext";
import { OverlayingText } from "./OverlayingText";
import { CapitalCards } from "./CapitalCards";

const Frame = styled.div`
  position: absolute;
  top: 0;
  height: 100dvh;
  width: 100dvw;
  z-index: -1;
`;

export const CanvasContainer = ({isDunesTransitioned}) => {
  /* 
  //Revise
  const inputMode = useInputs();
  useEffect(() => {
    inputMode("Canvas");

    return () => {
      inputMode("Preset");
    };
  }, []);
  */
 



  return (
    <Frame>
      <RaycastProvider>
        <OverlayingText></OverlayingText>
        <ThreeCanvas></ThreeCanvas>
        {isDunesTransitioned && <CapitalCards/>}
      </RaycastProvider>
    </Frame>
  );
};
