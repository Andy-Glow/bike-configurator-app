//Этот файл отвечает только за текущее состояние 3D-сцены
//(какой цвет выбран, какие галочки стоят)

import { create } from "zustand";
import { Bike } from "@/types";

interface ConfiguratorState {
  // Данные текущего выбранного велосипеда
  activeBike: Bike | null;
  selectedColor: string;
  selectedAccessories: string[]; // Массив ID выбранных аксессуаров

  // Действия
  initBike: (bike: Bike) => void;
  setColor: (colorHex: string) => void;
  toggleAccessory: (accessoryId: string) => void;
}

export const useConfigurator = create<ConfiguratorState>((set) => ({
  activeBike: null,
  selectedColor: "",
  selectedAccessories: [],

  // Вызывается при открытии страницы, чтобы сбросить настройки на дефолтные
  initBike: (bike) =>
    set({
      activeBike: bike,
      selectedColor: bike.colors[0].hex,
      selectedAccessories: [],
    }),

  // Установка цвета
  setColor: (hex) => set({ selectedColor: hex }),

  // Включение/выключение аксессуара
  toggleAccessory: (id) =>
    set((state) => ({
      selectedAccessories: state.selectedAccessories.includes(id)
        ? state.selectedAccessories.filter((accId) => accId !== id)
        : [...state.selectedAccessories, id],
    })),
}));
