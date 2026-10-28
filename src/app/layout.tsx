import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Header } from "@/components/layout/Header";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { OrderSuccessModal } from "@/components/cart/OrderSuccessModal";
import { FavoritesDrawer } from "@/components/favorites/FavoritesDrawer";
import { AuthModal } from "@/components/auth/AuthModal";

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
        <AuthModal />
        {children}
      </body>
    </html>
  );
}
