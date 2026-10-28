"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/store/useCart";
import { TrashIcon } from "../ui/Icons";
import styles from "./CartDrawer.module.scss";

export function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart, clearCart, completeOrder } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
          />

          <motion.div
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}>
            <div className={styles.header}>
              <h2>Корзина</h2>
              <button onClick={() => toggleCart(false)} className={styles.closeBtn}>
                ✕
              </button>
            </div>

            <div className={styles.itemsList}>
              {cart.length === 0 ? (
                <p className={styles.empty}>Ваша корзина пуста</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemInfo}>
                      <h4>{item.bike.name}</h4>
                      <div
                        className={styles.colorIndicator}
                        style={{ backgroundColor: item.color }}
                      />
                      <p className={styles.accs}>
                        {item.accessories.length > 0
                          ? `Аксессуаров: ${item.accessories.length} шт.`
                          : "Без аксессуаров"}
                      </p>
                    </div>
                    <div className={styles.itemActions}>
                      <span className={styles.price}>
                        {item.totalPrice.toLocaleString("ru-RU")} ₽
                      </span>
                      <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className={styles.footer}>
                {/* Кнопка Очистить над суммой */}
                <div className={styles.clearWrapper}>
                  <button onClick={clearCart} className={styles.clearBtn}>
                    Очистить корзину
                  </button>
                </div>

                <div className={styles.total}>
                  <span>Итого:</span>
                  <span>{totalPrice.toLocaleString("ru-RU")} ₽</span>
                </div>

                <button className={styles.checkoutBtn} onClick={completeOrder}>
                  Оформить заказ
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
