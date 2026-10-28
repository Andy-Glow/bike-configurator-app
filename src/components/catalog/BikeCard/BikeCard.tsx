"use client";

import Link from "next/link";
import Image from "next/image";
import { Bike } from "@/types";
import { useFavorites } from "@/store/useFavorites";
import { HeartIcon } from "../../ui/Icons";
import styles from "./BikeCard.module.scss";

interface BikeCardProps {
  bike: Bike;
  priority?: boolean; // Указывает, грузить ли картинку в первую очередь
}

export function BikeCard({ bike, priority = false }: BikeCardProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.includes(bike.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(bike.id);
  };

  return (
    <Link href={`/bike/${bike.id}`} className={styles.card}>
      <button
        className={`${styles.favoriteBtn} ${isFav ? styles.isFavorite : ""}`}
        onClick={handleFavoriteClick}>
        <HeartIcon />
      </button>

      <div className={styles.imageWrapper}>
        <Image
          src={bike.imageUrl}
          alt={bike.name}
          fill
          // sizes подсказывает Next.js, какой размер картинки скачивать для разных экранов
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          // priority=true отключает ленивую загрузку и грузит картинку сразу
          priority={priority}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{bike.name}</h3>
        <p className={styles.price}>{bike.basePrice.toLocaleString("ru-RU")} ₽</p>
      </div>
    </Link>
  );
}
