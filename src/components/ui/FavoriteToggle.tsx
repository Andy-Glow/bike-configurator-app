"use client";

import { useFavorites } from "@/store/useFavorites";
import { HeartIcon } from "./Icons";
import styles from "./FavoriteToggle.module.scss";

interface FavoriteToggleProps {
  bikeId: string;
}

export function FavoriteToggle({ bikeId }: FavoriteToggleProps) {
  // Достаем состояние избранного и метод переключения
  const { favorites, toggleFavorite } = useFavorites();

  // Проверяем, в избранном ли этот велосипед
  const isFav = favorites.includes(bikeId);

  return (
    <button
      className={`${styles.btn} ${isFav ? styles.active : ""}`}
      onClick={() => toggleFavorite(bikeId)}
      title={isFav ? "Удалить из избранного" : "Добавить в избранное"}>
      <HeartIcon />
      <span>{isFav ? "В избранном" : "В избранное"}</span>
    </button>
  );
}
