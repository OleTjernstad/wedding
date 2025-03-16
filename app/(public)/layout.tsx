import "./globals.css";

import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Miriam & Ole Tosten - Bryllupsliste",
  description: "Bryllupsliste for Miriam & Ole Tosten",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
