import React, { useState, useEffect, useRef } from "react";
import { Sphere } from "./Sphere";
import { TimezoneLine } from "./TimezoneLine";
import { Point } from "./Point";
import { useFrame } from "@react-three/fiber";
import { useCursorStates } from "@contexts/KeyboardInputContext";

export const Globe = () => {
  //Cursor (canvas) context
  const { isDragging, latestPos } = useCursorStates();
  // Timezones
  const numTimezones = 24;
  const angleIncrement = (2 * Math.PI) / numTimezones;
  const initialOffset = (270 * (2 * Math.PI)) / 360;

  const easeOutQuad = (t) => 1 - Math.pow(1 - t, 3);

  //Globe properties
  const globeGroupRef = useRef();
  const [isPointerOverGlobe, setPointerOverGlobe] = useState(false);
  const rotationSpeed = 0.5;
  const scaleProgress = useRef(0);
  useFrame((state, delta) => {
    if (globeGroupRef?.current && !isPointerOverGlobe && !isDragging) {
      globeGroupRef.current.rotation.y += delta * rotationSpeed;
    }
    if (globeGroupRef?.current) {
      const scale = globeGroupRef.current.scale;
      if (scaleProgress.current < 1.0) {
        scaleProgress.current = Math.min(
          scaleProgress.current + delta * 0.5,
          1.0
        );

        const easedProgress = easeOutQuad(scaleProgress.current);
        scale.x = easedProgress;
        scale.y = easedProgress;
        scale.z = easedProgress;
      }
    }
  });

  function rotateGlobe(x, y) {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.x += y * 0.005;
      globeGroupRef.current.rotation.y += x * 0.005;
    }
  }

  useEffect(() => {
    if (isDragging) {
      const [prev, current] = latestPos;
      const differentialX = current[0] - prev[0];
      const differentialY = current[1] - prev[1];
      rotateGlobe(differentialX, differentialY);
    }
  }, [latestPos, isDragging]);

  function handlePointerOverGlobe(boolean) {
    setPointerOverGlobe(boolean);
  }

  return (
    <group ref={globeGroupRef}>
      <group scale={1.2}>
        {Array.from({ length: numTimezones }).map((_, index) => (
          <TimezoneLine
            key={index}
            index={index}
            position={[0, 0, 0]}
            rotation={[0, index * angleIncrement + initialOffset, 0]}
            radius={2.01}
          />
        ))}
        <Sphere onPointerHandler={handlePointerOverGlobe} />
      </group>
    </group>
  );
};
