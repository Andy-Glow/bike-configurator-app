"use client";

import { useRouter } from "next/navigation";
import { useConfigurator } from "@/store/useConfigurator";
import { useCart } from "@/store/useCart";
import styles from "./ConfiguratorPanel.module.scss";
import { CartItem } from "@/types";

// Расширяем тип Document, чтобы TS понимал новый метод startViewTransition
type DocumentWithViewTransition = Document & {
  startViewTransition: (callback: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
    updateCallbackDone: Promise<void>;
    skipTransition: () => void;
  };
};

export function ConfiguratorPanel() {
  // Хук Next.js для программного перехода между страницами
  const router = useRouter();

  // Достаем текущее состояние конфигуратора и методы для его изменения
  const {
    activeBike,
    selectedColor,
    selectedAccessories,
    setColor,
    toggleAccessory,
    resetConfigurator,
  } = useConfigurator();

  // Достаем метод добавления товара в глобальную корзину
  const addToCart = useCart((state) => state.addToCart);

  // Защита: если велосипед не загружен, ничего не рендерим
  if (!activeBike) return null;

  // Вычисляем стоимость только выбранных аксессуаров
  const accessoriesPrice = activeBike.accessories
    .filter((acc) => selectedAccessories.includes(acc.id))
    .reduce((sum, acc) => sum + acc.price, 0);

  // Итоговая цена: базовая стоимость + аксессуары
  const totalPrice = activeBike.basePrice + accessoriesPrice;

  const handleAddToCart = () => {
    // 1. Формируем объект товара для корзины
    const newItem: CartItem = {
      id: crypto.randomUUID(),
      bike: activeBike,
      color: selectedColor,
      accessories: [...selectedAccessories],
      totalPrice,
    };

    // 2. Добавляем в корзину и сбрасываем текущие настройки (цвет, галочки)
    addToCart(newItem);
    resetConfigurator();

    // 3. Плавный переход на главную
    const doc = document as DocumentWithViewTransition;

    // Если браузер поддерживает View Transitions API — делаем красивый переход
    if (doc.startViewTransition) {
      doc.startViewTransition(() => {
        router.push("/");
      });
    } else {
      // Если нет (старые браузеры) — переходим обычно
      router.push("/");
    }
  };

  return (
    <div className={styles.panel}>
      {/* Секция выбора цвета рамы */}
      <div className={styles.section}>
        <h3 className={styles.title}>Цвет рамы</h3>
        <div className={styles.colorGrid}>
          {activeBike.colors.map((color) => (
            <button
              key={color.hex}
              // Добавляем класс active, если цвет выбран
              className={`${styles.colorBtn} ${selectedColor === color.hex ? styles.active : ""}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setColor(color.hex)}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Секция выбора аксессуаров */}
      <div className={styles.section}>
        <h3 className={styles.title}>Аксессуары</h3>
        <div className={styles.accessoryList}>
          {activeBike.accessories.map((acc) => (
            <label key={acc.id} className={styles.checkboxLabel}>
              <input
                type='checkbox'
                // Галочка активна, если ID аксессуара есть в массиве выбранных
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

      {/* Блок с итоговой стоимостью */}
      <div className={styles.totalBlock}>
        <span>Итого:</span>
        <span className={styles.totalPrice}>{totalPrice.toLocaleString("ru-RU")} ₽</span>
      </div>

      {/* Кнопка добавления в корзину */}
      <button className={styles.addToCartBtn} onClick={handleAddToCart}>
        Добавить в корзину
      </button>
    </div>
  );
}
