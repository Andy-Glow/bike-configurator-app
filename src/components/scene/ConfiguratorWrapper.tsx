"use client"; // Этот компонент будет работать только на клиенте

import dynamic from "next/dynamic";

// Динамически импортируем нашу 3D-сцену без SSR
const ConfiguratorCanvas = dynamic(() => import("./ConfiguratorCanvas"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%", background: "#1a1a1a" }} />,
});

export function ConfiguratorWrapper() {
  return <ConfiguratorCanvas />;
}
