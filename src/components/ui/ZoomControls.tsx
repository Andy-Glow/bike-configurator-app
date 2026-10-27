"use client";

import styles from "./ZoomControls.module.scss";

export function ZoomControls() {
  // Отправляем кастомные события, которые будет слушать Canvas
  const handleZoomIn = () => window.dispatchEvent(new CustomEvent("zoom", { detail: "in" }));
  const handleZoomOut = () => window.dispatchEvent(new CustomEvent("zoom", { detail: "out" }));

  return (
    <div className={styles.zoomWrapper}>
      <button onClick={handleZoomIn} className={styles.zoomBtn} title='Приблизить'>
        +
      </button>
      <button onClick={handleZoomOut} className={styles.zoomBtn} title='Отдалить'>
        −
      </button>
    </div>
  );
}
