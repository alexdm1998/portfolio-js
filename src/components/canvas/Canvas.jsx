import React, { useState, useEffect, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { CycleRaycast } from "@react-three/drei";
import { useHit } from "@contexts/RaycastContext";
import { Perf } from "r3f-perf";
import { ThreeText} from "./ThreeText";
import { Globe } from "./Globe";
import { useCursorInputs } from "@contexts/KeyboardInputContext";
import { Stars } from "./Stars";

export const ThreeCanvas = () => {
  const setHitObject = useHit();
  const [{ objects, cycle }, set] = useState({ objects: [], cycle: 0 });

  const handleCursorInputs = useCursorInputs();
  const canvasEvents = {
    onMouseDown: handleCursorInputs,
    onMouseUp: handleCursorInputs,
    onMouseLeave: handleCursorInputs,
    onMouseMove: handleCursorInputs,
  };

  useEffect(() => {
    if (objects.length != 0) {
      const firstHit = objects[0].object;
      setHitObject(firstHit["name"]);
    }

    if (objects.length == 0) {
      setHitObject("none");
    }
  }, [objects]);
  return (
    <Canvas {...canvasEvents} camera={{ fov: 100 }}>
      <Suspense fallback={null}>
        <ambientLight color="#910000" intensity={2.3}></ambientLight>
        <directionalLight position={[0,0,10]} color="#ff0000" intensity={0.5}/>

        <pointLight position={[4, 4, 3]} intensity={13} color="#ff9102" distance={10} />
        <ThreeText />
        <Globe />
      </Suspense>
      <CycleRaycast
        onChanged={(objects, cycle) => set({ objects, cycle })}
        scroll={false}
      ></CycleRaycast>
      <Stars />
      {/* <Perf position="bottom-left"></Perf> */}
    </Canvas>
  );
};
