"use client";

import dynamic from "next/dynamic";
import styles from "./ConfiguratorWrapper.module.scss";

// Динамически загружаем 3D-сцену без SSR
const ConfiguratorCanvas = dynamic(() => import("./ConfiguratorCanvas"), {
  ssr: false,
  // Пока грузится 3D-движок и модель, показываем этот текст
  loading: () => <div className={styles.loading}>Загрузка 3D-модели...</div>,
});

export function ConfiguratorWrapper() {
  return (
    <div className={styles.canvasContainer}>
      <ConfiguratorCanvas />
    </div>
  );
}
