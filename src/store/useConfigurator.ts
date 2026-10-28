//Этот файл отвечает только за текущее состояние 3D-сцены
//(какой цвет выбран, какие галочки стоят)

import { create } from "zustand";
import { Bike } from "@/types";

interface ConfiguratorState {
  activeBike: Bike | null;
  selectedColor: string;
  selectedAccessories: string[];

  initBike: (bike: Bike) => void;
  setColor: (colorHex: string) => void;
  toggleAccessory: (accessoryId: string) => void;
  resetConfigurator: () => void;
}

export const useConfigurator = create<ConfiguratorState>((set) => ({
  activeBike: null,
  selectedColor: "",
  selectedAccessories: [],

  initBike: (bike) =>
    set({
      activeBike: bike,
      selectedColor: bike.colors[0].hex,
      selectedAccessories: [],
    }),

  setColor: (hex) => set({ selectedColor: hex }),

  toggleAccessory: (id) =>
    set((state) => ({
      selectedAccessories: state.selectedAccessories.includes(id)
        ? state.selectedAccessories.filter((accId) => accId !== id)
        : [...state.selectedAccessories, id],
    })),

  // ИСПРАВЛЕНИЕ: Убрали activeBike: null, чтобы не ломать рендер страницы при переходе
  resetConfigurator: () =>
    set({
      selectedColor: "",
      selectedAccessories: [],
    }),
}));
