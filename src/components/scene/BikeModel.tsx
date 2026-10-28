"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useConfigurator } from "@/store/useConfigurator";
import * as THREE from "three";

export function BikeModel() {
  // 1. Получаем текущие данные из глобального стора
  const activeBike = useConfigurator((state) => state.activeBike);
  const selectedColor = useConfigurator((state) => state.selectedColor);
  const selectedAccessories = useConfigurator((state) => state.selectedAccessories);

  const groupRef = useRef<THREE.Group>(null);

  // Флаг готовности: скрывает модель, пока не завершатся расчеты масштаба
  const [isReady, setIsReady] = useState(false);

  // 2. Загружаем модель по URL
  const modelUrl = activeBike?.modelUrl || "/models/fixed-bike.glb";
  const { scene } = useGLTF(modelUrl);
  const { nodes } = useGraph(scene);

  // 3. СБРОС И ЦЕНТРИРОВАНИЕ МОДЕЛИ
  useLayoutEffect(() => {
    if (!scene) return;

    // Сбрасываем трансформации, чтобы кэш не ломал новые заходы
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
    scene.scale.set(1, 1, 1);

    // Ждем один кадр для обновления матриц Three.js
    const frame = requestAnimationFrame(() => {
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      // Центрируем сцену (сдвигаем так, чтобы центр был в 0,0,0)
      scene.position.set(-center.x, -center.y, -center.z);

      // Автомасштабирование под размер сцены
      const maxDim = Math.max(size.x, size.y, size.z);
      const desiredSize = 3.2;
      const autoScale = desiredSize / maxDim;
      scene.scale.setScalar(autoScale);

      setIsReady(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [scene]);

  // 4. СМЕНА ЦВЕТА РАМЫ И БАГАЖНИКА
  useEffect(() => {
    if (!selectedColor || !nodes) return;

    Object.keys(nodes).forEach((key) => {
      // Красим объекты Frame и Trunk
      if (key.startsWith("Frame") || key.startsWith("Trunk")) {
        const mesh = nodes[key] as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && mat.color) {
          mat.color.set(selectedColor);
        }
      }
    });
  }, [selectedColor, nodes]);

  // 5. УПРАВЛЕНИЕ ВИДИМОСТЬЮ АКСЕССУАРОВ (Крылья, корзина и т.д.)
  useEffect(() => {
    if (!scene || !activeBike) return;

    scene.traverse((child) => {
      if (child.name) {
        activeBike.accessories.forEach((acc) => {
          // Ищем совпадения по имени объекта
          if (child.name.toLowerCase().startsWith(acc.nodeName.toLowerCase())) {
            // Показываем, если галочка стоит
            child.visible = selectedAccessories.includes(acc.id);
          }
        });
      }
    });
  }, [scene, selectedAccessories, activeBike]);

  return (
    // visible={isReady} не дает модели "мигнуть" гигантским размером при загрузке
    <group ref={groupRef} rotation={[-Math.PI / 2, 0, 0]} visible={isReady}>
      <primitive object={scene} />
    </group>
  );
}
