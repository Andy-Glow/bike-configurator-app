import React, { useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export function useZoom(
  // 1. ИСПРАВЛЕНИЕ: Используем тот же строгий тип, что и в главном компоненте
  controlsRef: React.MutableRefObject<React.ElementRef<typeof OrbitControls> | null>,
) {
  useEffect(() => {
    const handleZoom = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!controlsRef.current) return;

      const controls = controlsRef.current;
      const camera = controls.object;
      const target = controls.target;

      // Вычисляем вектор от цели к камере
      const direction = new THREE.Vector3().subVectors(camera.position, target);

      // Изменяем длину вектора (приближаем/отдаляем)
      if (customEvent.detail === "in") {
        direction.multiplyScalar(0.85);
      } else {
        direction.multiplyScalar(1.15);
      }

      // Ограничиваем зум, чтобы не провалиться сквозь модель или не улететь слишком далеко
      const distance = direction.length();
      if (distance > 2.5 && distance < 12) {
        camera.position.copy(target).add(direction);
        controls.update();
      }
    };

    window.addEventListener("zoom", handleZoom);
    return () => window.removeEventListener("zoom", handleZoom);
  }, [controlsRef]);
}
