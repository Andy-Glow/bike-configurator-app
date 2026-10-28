"use client";

import { useState } from "react";
import { BIKES } from "@/data/bikes";
import { BikeCard } from "@/components/catalog/BikeCard/BikeCard";
import { Filters, FilterType } from "@/components/catalog/Filters";
import styles from "./page.module.scss";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<FilterType>("all");

  const filteredBikes = BIKES.filter((bike) => {
    const matchesSearch = bike.name.toLowerCase().includes(searchQuery.toLowerCase());
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

      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <div className={styles.grid}>
        {filteredBikes.length > 0 ? (
          filteredBikes.map((bike, index) => (
            <BikeCard
              key={bike.id}
              bike={bike}
              priority={index < 3} // Первые 3 карточки грузятся моментально
            />
          ))
        ) : (
          <p className={styles.noResults}>По вашему запросу ничего не найдено 😔</p>
        )}
      </div>
    </main>
  );
}
