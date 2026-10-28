"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/store/useAuth";
import { UserIcon } from "../ui/Icons";
import styles from "./AuthModal.module.scss";

export function AuthModal() {
  const { isAuthOpen, toggleAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Бутафорская функция входа
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    // Имитируем загрузку и успешный вход
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setEmail("");
      setPassword("");
      toggleAuth(false); // Закрываем окно через 1.5 секунды
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => toggleAuth(false)}>
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Не закрываем при клике внутри
          >
            <button className={styles.closeBtn} onClick={() => toggleAuth(false)}>
              ✕
            </button>

            <div className={styles.header}>
              <div className={styles.iconWrapper}>
                <UserIcon />
              </div>
              <h2 className={styles.title}>Личный кабинет</h2>
              <p className={styles.subtitle}>Войдите, чтобы отслеживать заказы</p>
            </div>

            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Электронная почта</label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='example@mail.ru'
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Пароль</label>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='••••••••'
                  required
                />
              </div>

              <button
                type='submit'
                className={`${styles.loginBtn} ${isSuccess ? styles.success : ""}`}
                disabled={isSuccess}>
                {isSuccess ? "Успешный вход..." : "Войти"}
              </button>
            </form>

            <div className={styles.footer}>
              <span>Нет аккаунта?</span>
              <button className={styles.registerBtn}>Зарегистрироваться</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
