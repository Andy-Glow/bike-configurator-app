"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/store/useCart";
import styles from "./OrderSuccessModal.module.scss";

export function OrderSuccessModal() {
  const { isOrderSuccessOpen, closeOrderSuccess } = useCart();

  return (
    <AnimatePresence>
      {isOrderSuccessOpen && (
        // Бэкдроп теперь работает как Flex-контейнер для центрирования
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeOrderSuccess}>
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Чтобы клик внутри не закрывал окно
          >
            <div className={styles.iconWrapper}>
              <svg
                width='48'
                height='48'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
                <polyline points='22 4 12 14.01 9 11.01'></polyline>
              </svg>
            </div>

            <h2 className={styles.title}>Спасибо за заказ!</h2>

            <p className={styles.description}>
              Чек отправлен на вашу электронную почту. Вам придёт уведомление, когда можно будет
              забрать товар из магазина.
            </p>

            <button className={styles.okBtn} onClick={closeOrderSuccess}>
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
