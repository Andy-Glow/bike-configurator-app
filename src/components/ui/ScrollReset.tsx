"use client";

import { useEffect } from "react";

export function ScrollReset() {
  useEffect(() => {
    // Принудительно прокручиваем страницу в самый верх при загрузке
    window.scrollTo(0, 0);
  }, []);

  return null; // Компонент не рисует никакого интерфейса
}
