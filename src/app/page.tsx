import { BIKES } from "@/data/bikes";
import { BikeCard } from "@/components/ui/BikeCard/BikeCard";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Выбери свой велосипед</h1>
        <p className={styles.subtitle}>
          Настрой его под себя в нашем интерактивном 3D-конфигураторе
        </p>
      </header>

      <div className={styles.grid}>
        {BIKES.map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}
      </div>
    </main>
  );
}
