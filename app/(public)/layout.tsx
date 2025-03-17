import "./globals.css";

import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

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
  return children;
}
