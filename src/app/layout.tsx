import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { RestaurantProvider } from "@/context/RestaurantContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Swipaa - Dining Decided, Together",
  description: "Swipe to decide where to eat with friends. Find restaurants your group will love in Bengaluru.",
  keywords: ["restaurant", "group dining", "bengaluru", "food discovery", "swipe"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Swipaa",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#221610",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        <RestaurantProvider>
          <div className="min-h-dvh bg-[#221610] text-white">
            {children}
          </div>
        </RestaurantProvider>
      </body>
    </html>
  );
}
