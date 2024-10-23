import React, { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import starrySkyFragmentShader from "../../shaders/StarrySky.frag?raw";
import starrySkyVertexShader from "../../shaders/StarrySky.vert?raw";

const MyShaderMaterial = shaderMaterial(
  { time: 0, resolution: [0, 0] }, // Define uniforms
  starrySkyVertexShader,
  starrySkyFragmentShader
);

extend({ MyShaderMaterial });

export const Stars = () => {
  const starrySkyRef = useRef();

  // Animate the 'time' uniform for the fade-in effect
  useFrame(({ gl }, delta) => {
    const { width, height } = gl.domElement;
    if (starrySkyRef.current) {
      starrySkyRef.current.uniforms.time.value += delta;
      starrySkyRef.current.uniforms.resolution.value = [width, height];
    }
  });

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[75, 25]}></planeGeometry>
      <myShaderMaterial ref={starrySkyRef}></myShaderMaterial>
    </mesh>
  );
};
