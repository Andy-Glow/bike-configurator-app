import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Header } from "@/components/layout/Header";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { OrderSuccessModal } from "@/components/cart/OrderSuccessModal";
import { FavoritesDrawer } from "@/components/favorites/FavoritesDrawer";
import { AuthModal } from "@/components/auth/AuthModal";

const basePath = process.env.NODE_ENV === "production" ? "/bike-configurator-app" : "";

// Описание
export const metadata: Metadata = {
  title: "VELOSIPED STUDIO | Интерактивный 3D-конфигуратор",
  description:
    "Собери свой идеальный велосипед в реальном времени. Выбирай цвет рамы и добавляй аксессуары.",
  icons: {
    icon: `${basePath}/favicon.png`,
  },
  openGraph: {
    title: "VELOSIPED STUDIO",
    description:
      "Собери свой идеальный велосипед в реальном времени. Выбирай цвет рамы и добавляй аксессуары.",
    images: [`${basePath}/bycicle-app-preview.jpg`], // Превью для Telegram, VK и т.д.
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body
        style={{
          // Задаем фон здесь, чтобы использовать переменную basePath
          backgroundImage: `linear-gradient(rgba(28, 28, 34, 0.85), rgba(28, 28, 34, 0.85)), url('${basePath}/background.jpg')`,
        }}>
        <Header />
        <CartDrawer />
        <OrderSuccessModal />
        <FavoritesDrawer />
        <AuthModal />
        {children}
      </body>
    </html>
  );
}
