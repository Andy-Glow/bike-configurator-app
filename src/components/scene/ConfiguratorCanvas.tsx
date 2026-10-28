"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useConfigurator } from "@/store/useConfigurator";
import { BikeModel } from "./BikeModel";
import { useZoom } from "@/hooks/useZoom";

export default function ConfiguratorCanvas() {
  // 1. ИСПРАВЛЕНИЕ: Вместо any используем строгий тип из Drei
  const controlsRef = useRef<React.ElementRef<typeof OrbitControls>>(null);

  // 2. Подключаем хук зума
  useZoom(controlsRef);

  return (
    <Canvas camera={{ position: [0, 1.5, 6.5], fov: 45 }}>
      {/* Освещение сцены */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} castShadow />

      {/* 
        Модель велосипеда. 
        key заставляет React полностью пересоздать модель при смене велосипеда.
      */}
      <BikeModel key={useConfigurator.getState().activeBike?.id} />

      {/* Управление мышкой */}
      <OrbitControls
        ref={controlsRef}
        target={[0, 0, 0]}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />

      {/* Красивое окружение для бликов */}
      <Environment preset='city' />
    </Canvas>
  );
}
