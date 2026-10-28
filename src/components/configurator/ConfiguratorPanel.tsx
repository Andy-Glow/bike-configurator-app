"use client";

import { useRouter } from "next/navigation";
import { useConfigurator } from "@/store/useConfigurator";
import { useCart } from "@/store/useCart";
import styles from "./ConfiguratorPanel.module.scss";
import { CartItem } from "@/types";

export function ConfiguratorPanel() {
  const router = useRouter();

  const {
    activeBike,
    selectedColor,
    selectedAccessories,
    setColor,
    toggleAccessory,
    resetConfigurator,
  } = useConfigurator();

  const addToCart = useCart((state) => state.addToCart);

  if (!activeBike) return null;

  const accessoriesPrice = activeBike.accessories
    .filter((acc) => selectedAccessories.includes(acc.id))
    .reduce((sum, acc) => sum + acc.price, 0);

  const totalPrice = activeBike.basePrice + accessoriesPrice;

  const handleAddToCart = () => {
    // 1. Формируем объект товара
    const newItem: CartItem = {
      id: crypto.randomUUID(),
      bike: activeBike,
      color: selectedColor,
      accessories: [...selectedAccessories],
      totalPrice,
    };

    // 2. Добавляем в корзину и сбрасываем настройки
    addToCart(newItem);
    resetConfigurator();

    // 3. Плавный переход на главную с микро-задержкой
    // Задержка в 100мс позволяет React безопасно размонтировать текущий компонент
    // и открыть корзину, не вызывая ошибку "Page couldn't load" на мобильных.
    setTimeout(() => {
      router.push("/");
    }, 100);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.section}>
        <h3 className={styles.title}>Цвет рамы</h3>
        <div className={styles.colorGrid}>
          {activeBike.colors.map((color) => (
            <button
              key={color.hex}
              className={`${styles.colorBtn} ${selectedColor === color.hex ? styles.active : ""}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setColor(color.hex)}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>Аксессуары</h3>
        <div className={styles.accessoryList}>
          {activeBike.accessories.map((acc) => (
            <label key={acc.id} className={styles.checkboxLabel}>
              <input
                type='checkbox'
                checked={selectedAccessories.includes(acc.id)}
                onChange={() => toggleAccessory(acc.id)}
                className={styles.checkbox}
              />
              <span className={styles.accName}>{acc.name}</span>
              <span className={styles.accPrice}>+{acc.price.toLocaleString("ru-RU")} ₽</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.totalBlock}>
        <span>Итого:</span>
        <span className={styles.totalPrice}>{totalPrice.toLocaleString("ru-RU")} ₽</span>
      </div>

      <button className={styles.addToCartBtn} onClick={handleAddToCart}>
        Добавить в корзину
      </button>
    </div>
  );
}
