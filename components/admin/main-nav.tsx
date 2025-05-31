"use client";

import { GiftIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/admin" className="flex items-center space-x-2">
        <GiftIcon className="h-6 w-6" />
        <span className="font-bold inline-block">Gaveliste</span>
      </Link>
      <nav className="flex gap-6">
        <Link
          href="/admin"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/admin" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Oversikt
        </Link>
        <Link
          href="/admin/gifts"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/admin/gifts" || pathname.startsWith("/admin/gifts/")
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          Gaver
        </Link>
        <Link
          href="/admin/categories"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/admin/categories" ||
              pathname.startsWith("/admin/categories/")
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          Kategorier
        </Link>
        <Link
          href="/admin/reservations"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/admin/reservations"
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          Reservasjoner
        </Link>
        <Link
          href="/admin/received-gifts"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/admin/received-gifts"
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          Mottatte gaver
        </Link>
        <Link
          href="/admin/settings"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/admin/settings"
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          Innstillinger
        </Link>
      </nav>
    </div>
  );
}
