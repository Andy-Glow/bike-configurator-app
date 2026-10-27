import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Header } from "@/components/layout/Header";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { OrderSuccessModal } from "@/components/ui/OrderSuccessModal";
import { FavoritesDrawer } from "@/components/ui/FavoritesDrawer";

export const metadata: Metadata = {
  title: "Velo Studio",
  description: "Интерактивный 3D-конфигуратор велосипедов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body>
        <Header />
        <CartDrawer />
        <OrderSuccessModal />
        <FavoritesDrawer />
        {children}
      </body>
    </html>
  );
}
