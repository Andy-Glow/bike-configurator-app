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

  // Считаем стоимость выбранных аксессуаров
  const accessoriesPrice = activeBike.accessories
    .filter((acc) => selectedAccessories.includes(acc.id))
    .reduce((sum, acc) => sum + acc.price, 0);

  const totalPrice = activeBike.basePrice + accessoriesPrice;

  const handleAddToCart = () => {
    // Формируем товар
    const newItem: CartItem = {
      id: crypto.randomUUID(),
      bike: activeBike,
      color: selectedColor,
      accessories: [...selectedAccessories],
      totalPrice,
    };

    addToCart(newItem);
    resetConfigurator(); // Очищаем выбор после добавления

    // Плавный переход на главную (через View Transitions API)
    const doc = document as any;
    if (doc.startViewTransition) {
      doc.startViewTransition(() => router.push("/"));
    } else {
      router.push("/");
    }
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
