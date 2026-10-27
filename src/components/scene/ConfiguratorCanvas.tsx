"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { Canvas, useGraph } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { useConfigurator } from "@/store/useConfigurator";
import * as THREE from "three";

function BikeModel() {
  const activeBike = useConfigurator((state) => state.activeBike);
  const selectedColor = useConfigurator((state) => state.selectedColor);
  const selectedAccessories = useConfigurator((state) => state.selectedAccessories);

  const groupRef = useRef<THREE.Group>(null);

  const modelUrl = activeBike?.modelUrl || "/models/fixed-bike.glb";
  const { scene } = useGLTF(modelUrl);
  const { nodes } = useGraph(scene);

  useLayoutEffect(() => {
    if (!scene) return;
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    scene.position.sub(center);

    if (groupRef.current) {
      const maxDim = Math.max(size.x, size.y, size.z);
      const desiredSize = 3.2;
      const autoScale = desiredSize / maxDim;
      groupRef.current.scale.setScalar(autoScale);
    }
  }, [scene]);

  useEffect(() => {
    if (!selectedColor || !nodes) return;
    Object.keys(nodes).forEach((key) => {
      if (key.startsWith("Frame") || key.startsWith("Trunk")) {
        const mesh = nodes[key] as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && mat.color) {
          mat.color.set(selectedColor);
        }
      }
    });
  }, [selectedColor, nodes]);

  useEffect(() => {
    if (!scene || !activeBike) return;
    scene.traverse((child) => {
      if (child.name) {
        activeBike.accessories.forEach((acc) => {
          if (child.name.toLowerCase().startsWith(acc.nodeName.toLowerCase())) {
            child.visible = selectedAccessories.includes(acc.id);
          }
        });
      }
    });
  }, [scene, selectedAccessories, activeBike]);

  return (
    <group ref={groupRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function ConfiguratorCanvas() {
  // 1. ИСПРАВЛЕНИЕ ТИПА TS: Указываем точный тип для OrbitControls
  const controlsRef = useRef<React.ElementRef<typeof OrbitControls>>(null);

  useEffect(() => {
    const handleZoom = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!controlsRef.current) return;

      const controls = controlsRef.current;
      const camera = controls.object;
      const target = controls.target;

      // 2. ПРАВИЛЬНЫЙ ЗУМ: Вычисляем направление от велосипеда к камере
      const direction = new THREE.Vector3().subVectors(camera.position, target);

      if (customEvent.detail === "in") {
        direction.multiplyScalar(0.85); // Приближаем (сжимаем вектор)
      } else {
        direction.multiplyScalar(1.15); // Отдаляем (растягиваем вектор)
      }

      // Ограничиваем зум, чтобы не провалиться внутрь модели или не улететь далеко
      const distance = direction.length();
      if (distance > 2.5 && distance < 12) {
        camera.position.copy(target).add(direction);
        controls.update();
      }
    };

    window.addEventListener("zoom", handleZoom);
    return () => window.removeEventListener("zoom", handleZoom);
  }, []);

  return (
    <Canvas camera={{ position: [0, 1.5, 6.5], fov: 45 }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} castShadow />

      <BikeModel key={useConfigurator.getState().activeBike?.id} />

      <OrbitControls
        ref={controlsRef}
        target={[0, 0, 0]}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
      <Environment preset='city' />
    </Canvas>
  );
}
