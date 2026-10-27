import { BIKES } from "@/data/bikes";
import { notFound } from "next/navigation";
import { InitConfigurator } from "@/components/ui/InitConfigurator";
import { ConfiguratorWrapper } from "@/components/scene/ConfiguratorWrapper";
import { ConfiguratorPanel } from "@/components/ui/ConfiguratorPanel";
import { FavoriteToggle } from "@/components/ui/FavoriteToggle";

export default async function BikePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const bike = BIKES.find((b) => b.id === resolvedParams.id);

  if (!bike) return notFound();

  return (
    <main style={{ height: "calc(100vh - 80px)", display: "flex", flexDirection: "column" }}>
      <InitConfigurator bike={bike} />

      <header
        style={{
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}>
        <div>
          <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>{bike.name}</h1>
          <p style={{ color: "#aaa" }}>{bike.description}</p>
        </div>

        {/* Кнопка "В избранное" */}
        <FavoriteToggle bikeId={bike.id} />
      </header>

      <div
        style={{
          flex: 1,
          position: "relative",
          background: "#0f0f13",
          borderRadius: "20px",
          margin: "0 40px 40px",
          overflow: "hidden",
        }}>
        <ConfiguratorWrapper />

        {/* Наша панель поверх 3D-сцены */}
        <ConfiguratorPanel />
      </div>
    </main>
  );
}
