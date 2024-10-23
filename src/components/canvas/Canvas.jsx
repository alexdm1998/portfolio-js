import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CycleRaycast } from "@react-three/drei";
import { useHit } from "@contexts/RaycastContext";
import { Perf } from "r3f-perf";
import { ThreeText } from "./ThreeText";
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
        <ambientLight color="#ffffff" intensity={2} />
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
