// Описание доступного цвета
export interface ColorOption {
  name: string; // Название для UI (например, "Матовый черный")
  hex: string; // HEX-код для CSS и 3D-материала
}

// Описание аксессуара
export interface Accessory {
  id: string;
  name: string;
  price: number;
  nodeName: string; // <--- ВАЖНО: Имя 3D-объекта в модели, которое мы будем включать/выключать
}

// Описание самого велосипеда
export interface Bike {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string; // Картинка-заглушка для карточки в каталоге
  colors: ColorOption[];
  accessories: Accessory[];
}

// Товар в корзине
export interface CartItem {
  id: string; // Уникальный ID для этой конкретной конфигурации
  bike: Bike;
  color: string; // HEX-код цвета
  accessories: string[]; // Массив ID аксессуаров
  totalPrice: number;
}

export interface Bike {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  type: "city" | "mountain" | "road";
  modelUrl: string; // путь к 3D-модели
  colors: ColorOption[];
  accessories: Accessory[];
}
