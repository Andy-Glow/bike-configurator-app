// Этот файл хранит товары, которые пользователь добавил в корзину,
// и состояние (открыта/закрыта панель).

import { create } from "zustand";
import { CartItem } from "@/types";

interface CartState {
  cart: CartItem[];
  isCartOpen: boolean;
  isOrderSuccessOpen: boolean;

  addToCart: (item: CartItem) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  toggleCart: (isOpen?: boolean) => void;

  completeOrder: () => void;
  closeOrderSuccess: () => void;
}

export const useCart = create<CartState>((set) => ({
  cart: [],
  isCartOpen: false,
  isOrderSuccessOpen: false,

  // Добавляет товар и сразу открывает панель
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
      isCartOpen: true,
    })),

  // Удаляет товар по его уникальному ID
  removeFromCart: (cartId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== cartId),
    })),

  // Очищаем массив товаров
  clearCart: () => set({ cart: [] }),

  // Открывает или закрывает корзину (если isOpen не передан - просто переключает)
  toggleCart: (isOpen) =>
    set((state) => ({
      isCartOpen: isOpen !== undefined ? isOpen : !state.isCartOpen,
    })),

  // Оформление заказа: очищаем корзину, закрываем её и открываем модалку
  completeOrder: () =>
    set({
      cart: [],
      isCartOpen: false,
      isOrderSuccessOpen: true,
    }),

  // Закрытие модалки успеха
  closeOrderSuccess: () => set({ isOrderSuccessOpen: false }),
}));
