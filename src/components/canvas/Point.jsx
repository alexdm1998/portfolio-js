import React from "react";

export const Point = ({ position, color = "#ffffff" }) => {
  const { latitude, longitude } = position;

  function SphericalToCartesian(latitude, longitude, radius = 2.0) {
    //First step - converting it to radians
    const latitude_radians = latitude * (Math.PI / 180);
    const longitude_radians = longitude * (Math.PI / 180);
    //Second step - converting spherical to cartesian
    const x = radius * Math.cos(latitude_radians) * Math.cos(longitude_radians);
    const y = radius * Math.cos(latitude_radians) * Math.sin(longitude_radians);
    const z = radius * Math.sin(latitude_radians);
    //Remapping because the coordinates are somehow flipped [x,y,z] -> [y,z,x]
    return [y, z, x];
  }

  return (
    <mesh position={SphericalToCartesian(latitude, longitude)} scale={0.3}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
