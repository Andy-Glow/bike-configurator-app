"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/store/useFavorites";
import { BIKES } from "@/data/bikes";
import { TrashIcon } from "./Icons";
import styles from "./FavoritesDrawer.module.scss";

export function FavoritesDrawer() {
  const { favorites, isFavoritesOpen, toggleFavoritesDrawer, toggleFavorite } = useFavorites();

  // Получаем полные объекты велосипедов по их ID
  const favBikes = BIKES.filter((bike) => favorites.includes(bike.id));

  return (
    <AnimatePresence>
      {isFavoritesOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleFavoritesDrawer(false)}
          />

          <motion.div
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}>
            <div className={styles.header}>
              <h2>Избранное</h2>
              <button onClick={() => toggleFavoritesDrawer(false)} className={styles.closeBtn}>
                ✕
              </button>
            </div>

            <div className={styles.itemsList}>
              {favBikes.length === 0 ? (
                <p className={styles.empty}>Вы пока ничего не добавили в избранное</p>
              ) : (
                favBikes.map((bike) => (
                  <Link
                    key={bike.id}
                    href={`/bike/${bike.id}`}
                    className={styles.favItem}
                    // При клике на карточку переходим и закрываем панель
                    onClick={() => toggleFavoritesDrawer(false)}>
                    <div className={styles.imageWrapper}>
                      <Image src={bike.imageUrl} alt={bike.name} fill className={styles.image} />
                    </div>

                    <div className={styles.info}>
                      <h4>{bike.name}</h4>
                      <span className={styles.price}>
                        {bike.basePrice.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>

                    {/* Кнопка удаления из избранного */}
                    <button
                      className={styles.removeBtn}
                      onClick={(e) => {
                        e.preventDefault(); // Отменяем переход по ссылке
                        e.stopPropagation(); // ОСТАНАВЛИВАЕМ всплытие, чтобы панель не закрывалась
                        toggleFavorite(bike.id);
                      }}>
                      <TrashIcon />
                    </button>
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
