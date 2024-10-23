import Front_Dune_SVG from "@assets/Dune.svg";
import Back_Dune_SVG from "@assets/Back_Dune.svg";
import Fade_Dune_SVG from "@assets/Fade_Dune.svg";
import Distant_Dune_SVG from "@assets/Distant_Dune.svg";
import { Dune } from "./Dune";

export const Dunes = ({ parallaxValue }) => {
  return (
    <>
      <Dune
        width="60%"
        positionRight="0%"
        verticalOffset="-20dvh"
        zIndex={3}
        delay={"1s"}
        delayOn="fadeOut"
        parallaxValue={parallaxValue * 0.05}
        src={Front_Dune_SVG}
      />
      <Dune
        width="40%"
        positionRight="0%"
        verticalOffset="-20dvh"
        zIndex={1}
        delay={"1s"}
        delayOn="fadeIn"
        parallaxValue={parallaxValue * 0.05 * 0.4}
        src={Back_Dune_SVG}
      />
      <Dune
        width="40%"
        positionRight="50%"
        verticalOffset="-10dvh"
        zIndex={2}
        delay={"0.5s"}
        delayOn="fadeOut"
        parallaxValue={parallaxValue * 0.05 * 0.3}
        src={Fade_Dune_SVG}
      />
      <Dune
        width="30%"
        positionRight="35%"
        verticalOffset="-3dvh"
        zIndex={0}
        delay={"0.5s"}
        delayOn="fadeIn"
        parallaxValue={parallaxValue * 0.05 * 0.2}
        src={Distant_Dune_SVG}
      />
    </>
  );
};
