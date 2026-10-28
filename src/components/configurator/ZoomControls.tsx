"use client";

import styles from "./ZoomControls.module.scss";
import { PlusIcon, MinusIcon } from "@/components/ui/Icons";

export function ZoomControls() {
  const handleZoomIn = () => window.dispatchEvent(new CustomEvent("zoom", { detail: "in" }));
  const handleZoomOut = () => window.dispatchEvent(new CustomEvent("zoom", { detail: "out" }));

  return (
    <div className={styles.zoomWrapper}>
      <button onClick={handleZoomIn} className={styles.zoomBtn} title='Приблизить'>
        <PlusIcon />
      </button>
      <button onClick={handleZoomOut} className={styles.zoomBtn} title='Отдалить'>
        <MinusIcon />
      </button>
    </div>
  );
}
