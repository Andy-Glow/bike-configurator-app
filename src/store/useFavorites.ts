import { create } from "zustand";

interface FavoritesState {
  favorites: string[]; // Массив ID велосипедов
  isFavoritesOpen: boolean;

  toggleFavorite: (id: string) => void;
  toggleFavoritesDrawer: (isOpen?: boolean) => void;
}

export const useFavorites = create<FavoritesState>((set) => ({
  favorites: [],
  isFavoritesOpen: false,

  // Добавляет/удаляет из избранного
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((favId) => favId !== id) // Удаляем, если уже есть
        : [...state.favorites, id], // Добавляем, если нет
    })),

  // Открывает/закрывает панель
  toggleFavoritesDrawer: (isOpen) =>
    set((state) => ({
      isFavoritesOpen: isOpen !== undefined ? isOpen : !state.isFavoritesOpen,
    })),
}));
