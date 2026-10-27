import { Bike } from "@/types";

export const BIKES: Bike[] = [
  {
    id: "urban-01",
    name: "Urban Cruiser",
    description: "Идеальный городской велосипед для ежедневных поездок. Легкая алюминиевая рама.",
    basePrice: 45000,
    imageUrl:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop",
    colors: [
      { name: "Матовый черный", hex: "#1a1a1a" },
      { name: "Классический синий", hex: "#1e3a8a" },
      { name: "Красный", hex: "#dc2626" },
    ],
    accessories: [
      { id: "wing-rear", name: "Заднее крыло", price: 1500, nodeName: "wing_rear" },
      { id: "rack", name: "Багажник", price: 3000, nodeName: "rack" },
      { id: "light", name: "Фонарь", price: 800, nodeName: "light" },
    ],
  },
  {
    id: "mountain-01",
    name: "Mountain Peak",
    description: "Горный велосипед для бездорожья. Амортизационная вилка и 21 скорость.",
    basePrice: 68000,
    imageUrl:
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=800&auto=format&fit=crop",
    colors: [
      { name: "Хаки", hex: "#4d5d53" },
      { name: "Оранжевый", hex: "#f97316" },
      { name: "Черный", hex: "#000000" },
    ],
    accessories: [
      { id: "wing-front", name: "Переднее крыло", price: 1200, nodeName: "wing_front" },
      { id: "wing-rear", name: "Заднее крыло", price: 1500, nodeName: "wing_rear" },
      { id: "bottle", name: "Фляга", price: 600, nodeName: "bottle" },
    ],
  },
  {
    id: "road-01",
    name: "Aero Speed",
    description: "Шоссейный велосипед для максимальной скорости. Карбоновая рама и легкие колеса.",
    basePrice: 120000,
    imageUrl:
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=800&auto=format&fit=crop",
    colors: [
      { name: "Белый", hex: "#ffffff" },
      { name: "Неоновый желтый", hex: "#eab308" },
    ],
    accessories: [
      { id: "bottle", name: "Спортивная фляга", price: 800, nodeName: "bottle" },
      { id: "computer", name: "Велокомпьютер", price: 4500, nodeName: "computer" },
    ],
  },
];
