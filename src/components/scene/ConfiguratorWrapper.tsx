"use client";

import dynamic from "next/dynamic";
import styles from "./ConfiguratorWrapper.module.scss";

const ConfiguratorCanvas = dynamic(() => import("./ConfiguratorCanvas"), {
  ssr: false,
  loading: () => <div className={styles.loading}>Загрузка 3D...</div>,
});

export function ConfiguratorWrapper() {
  return (
    <div className={styles.canvasContainer}>
      <ConfiguratorCanvas />
    </div>
  );
}
