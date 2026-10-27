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
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.includes(bike.id);

  // Останавливаем клик, чтобы не переходить на страницу велосипеда
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(bike.id);
  };

  return (
    <Link href={`/bike/${bike.id}`} className={styles.card}>
      {/* Кнопка избранного поверх картинки */}
      <button
        className={`${styles.favoriteBtn} ${isFav ? styles.isFavorite : ""}`}
        onClick={handleFavoriteClick}>
        <HeartIcon />
      </button>

      <div className={styles.imageWrapper}>
        <Image src={bike.imageUrl} alt={bike.name} fill sizes='33vw' className={styles.image} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{bike.name}</h3>
        <p className={styles.price}>{bike.basePrice.toLocaleString("ru-RU")} ₽</p>
      </div>
    </Link>
  );
}
