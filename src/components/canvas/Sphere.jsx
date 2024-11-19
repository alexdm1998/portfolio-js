import React from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useRaycast } from "@contexts/RaycastContext";
import { useTimezone } from "@contexts/TimezoneContext";
import WorldMap from "@assets/World_Map.png";

export const Sphere = ({ onPointerHandler }) => {
  const { setGmtOffset: changeTimezone } = useTimezone();
  const texture = useLoader(THREE.TextureLoader, WorldMap);

  const currentHit = useRaycast();

  function getTimezone() {
    changeTimezone(currentHit);
  }

  //Get the coordinates on pointerDown
  function getCoordinates(e) {
    const globe = e.object;
    const point = globe.worldToLocal(e.point.clone());

    const radius = 2;

    // Deviation angle in radians (for example, 12 degrees)
    const deviation = THREE.MathUtils.degToRad(-12);

    // Adjust the x and z coordinates before atan2
    const adjustedX =
      point.x * Math.cos(deviation) - point.z * Math.sin(deviation);
    const adjustedZ =
      point.x * Math.sin(deviation) + point.z * Math.cos(deviation);

    // Compute latitude
    const lat = Math.asin(point.y / radius);

    // Compute longitude with adjusted x and z
    const lon = Math.atan2(adjustedZ, adjustedX) * -1;

    // Convert radians to degrees
    const latDeg = THREE.MathUtils.radToDeg(lat);
    const lonDeg = THREE.MathUtils.radToDeg(lon);
    console.log(
      "Latitude:",
      latDeg,
      "degrees and Longitude:",
      lonDeg,
      "degrees"
    );
  }

  //Switch functions
  function handlePointerDown(e) {
    if (true) {
      getTimezone();
    } else {
      getCoordinates(e);
    }
  }

  function handlePointerOver() {
    onPointerHandler(true);
  }

  function handlePointerLeave() {
    onPointerHandler(false);
  }

  return (
    <mesh
      name="globe"
      position={[0, 0, 0]}
      rotation={[0, -1.35, 0]}
      onPointerOver={handlePointerOver}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
    >
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial
        color="#a92e0b"
        opacity={1}
        transparent
        map={texture}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
