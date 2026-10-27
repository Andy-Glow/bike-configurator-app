"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useConfigurator } from "@/store/useConfigurator";
import * as THREE from "three";

function BikePlaceholder() {
  const selectedColor = useConfigurator((state) => state.selectedColor);
  const meshRef = useRef<THREE.Mesh>(null);

  // Медленно вращаем куб каждый кадр
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color={selectedColor || "#3b82f6"}
        roughness={0.3} // Легкий блеск
        metalness={0.2}
      />
    </mesh>
  );
}

export default function ConfiguratorCanvas() {
  return (
    <Canvas camera={{ position: [2, 1.5, 3], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />

      <BikePlaceholder />

      <OrbitControls enableZoom={true} enablePan={false} />
      <Environment preset='city' />
    </Canvas>
  );
}
