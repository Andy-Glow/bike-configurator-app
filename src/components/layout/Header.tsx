"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { CartIcon, HeartIcon, UserIcon } from "../ui/Icons";
import { useCart } from "@/store/useCart";

export function Header() {
  const { cart, toggleCart } = useCart();

  // Считаем общую стоимость всех товаров в корзине
  const totalCartPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <header className={styles.header}>
      <Link href='/' className={styles.logo}>
        <span className={styles.logoIcon}>🚲</span>
        <div className={styles.logoText}>
          <span className={styles.logoTitle}>VELO STUDIO</span>
          <span className={styles.logoSubtitle}>Конфигуратор велосипедов</span>
        </div>
      </Link>

      <div className={styles.actions}>
        {/* Кнопка открывает корзину по клику */}
        <button className={styles.actionBtn} onClick={() => toggleCart(true)}>
          <div className={styles.cartIconWrapper}>
            <CartIcon />
            {/* Показываем бейдж, только если в корзине есть товары */}
            {cart.length > 0 && <span className={styles.badge}>{cart.length}</span>}
          </div>
          <span className={styles.cartSum}>
            {totalCartPrice === 0 ? "0 ₽" : `${totalCartPrice.toLocaleString("ru-RU")} ₽`}
          </span>
        </button>

        <button className={styles.actionBtn}>
          <HeartIcon />
        </button>
        <button className={styles.actionBtn}>
          <UserIcon />
        </button>
      </div>
    </header>
  );
}
