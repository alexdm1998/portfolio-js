import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useRaycast } from "@contexts/RaycastContext";
import { BoundingSegment } from "./BoundingSegment";

export const TimezoneLine = (props) => {
  const semicircleRef = useRef();
  const hitObject = useRaycast();

  const lineGeometry = useMemo(() => {
    const vertices = [];
    const divisions = 20;
    const radius = props.radius;

    for (let i = 0; i <= divisions; i++) {
      const v = (i / divisions) * Math.PI;
      const x = Math.sin(v) * radius;
      const y = Math.cos(v) * radius;
      vertices.push(new THREE.Vector3(x, y, 0));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
    return geometry;
  }, []);

  function HighlightLine() {
    if (hitObject >= 0) return hitObject == props.index ? "#ffffff" : "#313131";
    return hitObject + 24 == props.index ? "#ffffff" : "#313131";
  }

  return (
    <group ref={semicircleRef}>
      <line
        onUpdate={(line) => line.computeLineDistances()}
        geometry={lineGeometry}
        {...props}
      >
        <lineDashedMaterial
          scale={10}
          color={HighlightLine()}
          dashSize={0.2}
          gapSize={0.2}
          side={THREE.FrontSide}
        ></lineDashedMaterial>
      </line>
      <BoundingSegment
        name={`${props.index}`}
        rotation={props.rotation}
      ></BoundingSegment>
    </group>
  );
};
