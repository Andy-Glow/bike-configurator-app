"use client";

import styles from "./Filters.module.scss";

// Тип для категорий (совпадает с нашим типом Bike)
export type FilterType = "all" | "city" | "mountain" | "road";

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: FilterType;
  setSelectedType: (type: FilterType) => void;
}

export function Filters({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
}: FiltersProps) {
  // Массив кнопок для удобного рендера
  const categories: { label: string; value: FilterType }[] = [
    { label: "Все", value: "all" },
    { label: "Городские", value: "city" },
    { label: "Горные", value: "mountain" },
    { label: "Шоссейные", value: "road" },
  ];

  return (
    <div className={styles.filtersContainer}>
      {/* Строка поиска */}
      <div className={styles.searchWrapper}>
        <svg
          className={styles.searchIcon}
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <circle cx='11' cy='11' r='8'></circle>
          <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
        </svg>
        <input
          type='text'
          placeholder='Поиск велосипеда...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Кнопки категорий */}
      <div className={styles.categories}>
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`${styles.categoryBtn} ${selectedType === cat.value ? styles.active : ""}`}
            onClick={() => setSelectedType(cat.value)}>
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
