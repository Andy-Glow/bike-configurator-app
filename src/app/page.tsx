"use client"; // Обязательно, так как используем useState

import { useState } from "react";
import { BIKES } from "@/data/bikes";
import { BikeCard } from "@/components/ui/BikeCard/BikeCard";
import { Filters, FilterType } from "@/components/ui/Filters";
import styles from "./page.module.scss";

export default function Home() {
  // Стейт для строки поиска
  const [searchQuery, setSearchQuery] = useState("");
  // Стейт для выбранной категории
  const [selectedType, setSelectedType] = useState<FilterType>("all");

  // Фильтруем массив велосипедов на основе поиска и категории
  const filteredBikes = BIKES.filter((bike) => {
    // Проверка на совпадение по названию (игнорируем регистр)
    const matchesSearch = bike.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Проверка на совпадение по типу
    const matchesType = selectedType === "all" || bike.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Выбери свой велосипед</h1>
        <p className={styles.subtitle}>
          Настрой его под себя в нашем интерактивном 3D-конфигураторе
        </p>
      </header>

      {/* Компонент фильтров */}
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {/* Сетка карточек */}
      <div className={styles.grid}>
        {filteredBikes.length > 0 ? (
          filteredBikes.map((bike) => <BikeCard key={bike.id} bike={bike} />)
        ) : (
          // Показываем сообщение, если ничего не найдено
          <p className={styles.noResults}>По вашему запросу ничего не найдено 😔</p>
        )}
      </div>
    </main>
  );
}
