import Link from "next/link";
import Image from "next/image";
import { Bike } from "@/types";
import styles from "./BikeCard.module.scss";

interface BikeCardProps {
  bike: Bike;
}

export function BikeCard({ bike }: BikeCardProps) {
  return (
    <Link href={`/bike/${bike.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={bike.imageUrl}
          alt={bike.name}
          fill // Заставляет картинку заполнить весь контейнер
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{bike.name}</h3>
        <p className={styles.price}>{bike.basePrice.toLocaleString("ru-RU")} ₽</p>
      </div>
    </Link>
  );
}
