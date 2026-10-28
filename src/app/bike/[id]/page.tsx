import { BIKES } from "@/data/bikes";
import { notFound } from "next/navigation";
import { InitConfigurator } from "@/components/configurator/InitConfigurator";
import { ConfiguratorWrapper } from "@/components/scene/ConfiguratorWrapper";
import { ConfiguratorPanel } from "@/components/configurator/ConfiguratorPanel";
import { FavoriteToggle } from "@/components/favorites/FavoriteToggle";
import { ZoomControls } from "@/components/configurator/ZoomControls";
import { ScrollReset } from "@/components/ui/ScrollReset";
import styles from "./page.module.scss";

export default async function BikePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const bike = BIKES.find((b) => b.id === resolvedParams.id);

  if (!bike) return notFound();

  return (
    <main className={styles.main}>
      <ScrollReset />
      <InitConfigurator bike={bike} />
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{bike.name}</h1>
          <p className={styles.description}>{bike.description}</p>
        </div>
        <FavoriteToggle bikeId={bike.id} />
      </header>
      <div className={styles.configuratorContainer}>
        <ConfiguratorWrapper />
        <ConfiguratorPanel />
        <ZoomControls />
      </div>
    </main>
  );
}
