import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getRestaurantName } from "@/lib/restaurant-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const restaurantName = getRestaurantName();

export const metadata: Metadata = {
  title: `${restaurantName} - Menú Digital`,
  description: `Menú digital de ${restaurantName} actualizado en tiempo real. Escanea el QR para ver nuestras especialidades y precios actuales.`,
  keywords: ["menu", "restaurante", "comida", "digital", "QR", restaurantName.toLowerCase()],
  authors: [{ name: restaurantName }],
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  openGraph: {
    title: `${restaurantName} - Menú Digital`,
    description: `Descubre el menú de ${restaurantName}`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
