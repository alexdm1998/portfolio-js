import React, { useMemo } from "react";
import * as THREE from "three";

//This component serves as hit zone for each timezone
export const BoundingSegment = (props) => {
  const width = (Math.PI * 2) / 24;
  const initRotation = Math.PI;
  const radius = 2.01;
  const widthSegments = 32;
  const heightSegments = 32;
  const phiStart = 0 + initRotation - (width / 2); //prettier-ignore
  const phiLength = width;
  const thetaStart = 0;
  const thetaLength = Math.PI;

  const segmentGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments,
      phiStart,
      phiLength,
      thetaStart,
      thetaLength
    );

    return geometry;
  }, []);

  function MapGMT() {
    if (props.name < 12) {
      return props.name;
    }
    return props.name - 24;
  }

  return (
    <mesh
      rotation={props.rotation}
      geometry={segmentGeometry}
      onPointerOver={() => {}}
      name={MapGMT()}
    >
      <meshBasicMaterial
        transparent={true}
        opacity={0}
        depthTest={false}
      ></meshBasicMaterial>
    </mesh>
  );
};
