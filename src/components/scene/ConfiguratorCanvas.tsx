"use client";

import { useEffect, useMemo } from "react";
import { Canvas, useGraph } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { useConfigurator } from "@/store/useConfigurator";
import * as THREE from "three";

function BikeModel() {
  const activeBike = useConfigurator((state) => state.activeBike);
  const selectedColor = useConfigurator((state) => state.selectedColor);

  const modelUrl = activeBike?.modelUrl || "/models/fixed-bike.glb";
  const { scene } = useGLTF(modelUrl);

  // Убрали жесткую типизацию всего объекта materials
  const { materials } = useGraph(scene);

  useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);

  useEffect(() => {
    if (!selectedColor) return;

    // Ищем материал и приводим его к типу MeshStandardMaterial,
    // так как мы точно знаем, что материал рамы поддерживает цвет.
    const paintMaterial = (materials["Frame_Paint"] ||
      materials["Bike_body"]) as THREE.MeshStandardMaterial;

    if (paintMaterial) {
      paintMaterial.color.set(selectedColor);
    }
  }, [selectedColor, materials]);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} scale={0.02}>
      <primitive object={scene} />
    </group>
  );
}

export default function ConfiguratorCanvas() {
  return (
    <Canvas camera={{ position: [1.5, 1, 4], fov: 45 }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} castShadow />

      <BikeModel />

      <OrbitControls
        target={[0.5, 0, 0]}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
      <Environment preset='city' />
    </Canvas>
  );
}
