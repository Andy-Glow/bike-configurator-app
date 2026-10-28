"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";
import { CartIcon, HeartIcon, UserIcon } from "../ui/Icons";
import { useCart } from "@/store/useCart";
import { useFavorites } from "@/store/useFavorites";
import { useAuth } from "@/store/useAuth";

// Добавляем префикс пути для картинки логотипа
const basePath = process.env.NODE_ENV === "production" ? "/bike-configurator-app" : "";

export function Header() {
  const { cart, toggleCart } = useCart();
  const { favorites, toggleFavoritesDrawer } = useFavorites();
  const { toggleAuth } = useAuth();

  const totalCartPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <header className={styles.header}>
      <Link href='/' className={styles.logo}>
        {/* Применяем basePath к пути логотипа */}
        <Image
          src={`${basePath}/velo-logo.png`}
          alt='Velo Studio'
          width={40}
          height={40}
          className={styles.logoImage}
        />

        <div className={styles.logoText}>
          <span className={styles.logoTitle}>VELOSIPED STUDIO</span>
          <span className={styles.logoSubtitle}>Конфигуратор велосипедов</span>
        </div>
      </Link>

      <div className={styles.actions}>
        {/* ... остальной код шапки без изменений ... */}
        <button className={styles.actionBtn} onClick={() => toggleCart(true)}>
          <div className={styles.cartIconWrapper}>
            <CartIcon />
            {cart.length > 0 && <span className={styles.badge}>{cart.length}</span>}
          </div>
          <span className={styles.cartSum}>
            {totalCartPrice === 0 ? "0 ₽" : `${totalCartPrice.toLocaleString("ru-RU")} ₽`}
          </span>
        </button>

        <button className={styles.actionBtn} onClick={() => toggleFavoritesDrawer(true)}>
          <div className={styles.cartIconWrapper}>
            <HeartIcon />
            {favorites.length > 0 && <span className={styles.badge}>{favorites.length}</span>}
          </div>
        </button>

        <button className={styles.actionBtn} onClick={() => toggleAuth(true)}>
          <UserIcon />
        </button>
      </div>
    </header>
  );
}
