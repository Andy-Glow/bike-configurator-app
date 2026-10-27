"use client";

import Link from "next/link";
import Image from "next/image";
import { Bike } from "@/types";
import { useFavorites } from "@/store/useFavorites";
import { HeartIcon } from "../Icons";
import styles from "./BikeCard.module.scss";

interface BikeCardProps {
  bike: Bike;
}

export function BikeCard({ bike }: BikeCardProps) {
  // Достаем список избранного и метод переключения
  const { favorites, toggleFavorite } = useFavorites();

  // Проверяем, находится ли этот велосипед в избранном
  const isFav = favorites.includes(bike.id);

  // Обработчик клика по сердечку (чтобы не переходить на страницу)
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(bike.id);
  };

  return (
    <Link href={`/bike/${bike.id}`} className={styles.card}>
      {/* Кнопка "В избранное" (в правом верхнем углу) */}
      <button
        className={`${styles.favoriteBtn} ${isFav ? styles.isFavorite : ""}`}
        onClick={handleFavoriteClick}
        title={isFav ? "Удалить из избранного" : "Добавить в избранное"}>
        <HeartIcon />
      </button>

      <div className={styles.imageWrapper}>
        <Image
          src={bike.imageUrl}
          alt={bike.name}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className={styles.image}
        />
      </div>

      {/* Блок с названием и ценой */}
      <div className={styles.content}>
        <h3 className={styles.title}>{bike.name}</h3>
        <p className={styles.price}>{bike.basePrice.toLocaleString("ru-RU")} ₽</p>
      </div>
    </Link>
  );
}
