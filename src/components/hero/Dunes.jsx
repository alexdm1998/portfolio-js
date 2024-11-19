import Front_Dune_SVG from "@assets/Dune.svg";
import Back_Dune_SVG from "@assets/Back_Dune.svg";
import Fade_Dune_SVG from "@assets/Fade_Dune.svg";
import Distant_Dune_SVG from "@assets/Distant_Dune.svg";
import { Dune } from "./Dune";
import { useEffect, useState } from "react";
import { useNavigation } from "@contexts/NavigationContext";

export const Dunes = ({ parallaxValue, onDuneTransitioned }) => {
  const navigation = useNavigation();
  const [transitionsEnd, setTransitionsEnd] = useState({
    front: false,
    back: false,
    fade: false,
    distant: false,
  });

  function setTransitionEnd(id) {
    if (navigation != "RP") return
    setTransitionsEnd((prev) => ({ ...prev, [id]: true }));
  }

  useEffect(() => {
    const values = Object.values(transitionsEnd);
    const isUniform = values.every((value) => value === values[0]);
    if (isUniform) {
      if (values[0] === true) {
        onDuneTransitioned(true);
      } else {
        onDuneTransitioned(false);
      }
    }
  }, [transitionsEnd, onDuneTransitioned]);

  useEffect(() => {
    if (navigation != "RP") {
      setTransitionsEnd((prevState) =>
        Object.keys(prevState).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {})
      );
    }
  }, [navigation]);

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
        onTransitionEnd={() => setTransitionEnd("front")}
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
        onTransitionEnd={() => setTransitionEnd("back")}
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
        onTransitionEnd={() => setTransitionEnd("fade")}
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
        onTransitionEnd={() => setTransitionEnd("distant")}
      />
    </>
  );
};
