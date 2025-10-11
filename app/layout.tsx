import type { Metadata } from "next";
import { HeroUIProvider } from "@heroui/react";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "OEE Monitoring Dashboard",
  description: "Overall Equipment Effectiveness Monitoring Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <HeroUIProvider>
          <Providers>
            {children}
          </Providers>
        </HeroUIProvider>
      </body>
    </html>
  );
}