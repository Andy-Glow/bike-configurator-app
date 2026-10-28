import { Bike } from "@/types";

// Префикс для правильной загрузки картинок и моделей на GitHub Pages
const BASE = process.env.NODE_ENV === "production" ? "/bike-configurator-app" : "";

export const BIKES: Bike[] = [
  {
    id: "road-01",
    name: "Фикс-гир",
    description: "Облегчёный велосипед для максимальной скорости. Карбоновая рама и узкие колеса.",
    basePrice: 67000,
    imageUrl: `${BASE}/fixed-bike.jpg`,
    type: "road",
    modelUrl: `${BASE}/models/fixed-bike.glb`,
    colors: [
      { name: "Неоновый желтый", hex: "#eab308" },
      { name: "Сёрфер", hex: "#00dacf" },
      { name: "Красный", hex: "#e61212" },
      { name: "Глубокий синий", hex: "#030188" },
      { name: "Белый", hex: "#ffffff" },
    ],
    accessories: [
      { id: "computer", name: "Велокомпьютер", price: 4500, nodeName: "computer" },
      { id: "insurance", name: "Страховка на 1 год", price: 10800, nodeName: "insurance" },
      { id: "bottle", name: "Фляга", price: 600, nodeName: "bottle" },
    ],
  },
  {
    id: "mountain-01",
    name: "Славный Горец",
    description: "Горный велосипед для бездорожья. Амортизационная вилка и 21 скорость.",
    basePrice: 98000,
    imageUrl: `${BASE}/mountain-bike.jpg`,
    type: "mountain",
    modelUrl: `${BASE}/models/mountain-bike.glb`,
    colors: [
      { name: "Хаки", hex: "#4d5d53" },
      { name: "Оранжевый", hex: "#f97316" },
      { name: "Белый", hex: "#ebeaea" },
    ],
    accessories: [
      { id: "computer", name: "Велокомпьютер", price: 4500, nodeName: "computer" },
      { id: "insurance", name: "Страховка на 1 год", price: 10800, nodeName: "insurance" },
      { id: "bottle", name: "Фляга", price: 600, nodeName: "bottle" },
    ],
  },
  {
    id: "urban-01",
    name: "Городничий",
    description: "Идеальный городской велосипед для ежедневных поездок. Легкая алюминиевая рама.",
    basePrice: 45000,
    imageUrl: `${BASE}/city-bike.jpg`,
    type: "city",
    modelUrl: `${BASE}/models/city-bike.glb`,
    colors: [
      { name: "Классический синий", hex: "#02c5e7" },
      { name: "Бордовый", hex: "#b64444" },
    ],
    accessories: [
      { id: "trunk", name: "Багажник", price: 3000, nodeName: "trunk" },
      { id: "wings", name: "Крылья", price: 2500, nodeName: "wings" },
      { id: "bucket", name: "Корзина", price: 2000, nodeName: "bucket" },
      { id: "computer", name: "Велокомпьютер", price: 4500, nodeName: "computer" },
      { id: "insurance", name: "Страховка на 1 год", price: 10800, nodeName: "insurance" },
      { id: "bottle", name: "Фляга", price: 600, nodeName: "bottle" },
    ],
  },
];
