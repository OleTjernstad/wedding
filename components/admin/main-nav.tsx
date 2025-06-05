"use client";

import { GiftIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4 md:gap-10 relative">
      <Link href="/admin" className="flex items-center space-x-2">
        <GiftIcon className="h-6 w-6" />
        <span className="font-bold inline-block">Gaveliste</span>
      </Link>
      {/* Hamburger for mobile using Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="md:hidden ml-auto p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Open menu"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col gap-4 p-6 md:hidden w-2/3 max-w-xs"
        >
          <DialogTitle className="mb-2 text-lg font-bold">Meny</DialogTitle>
          <Link
            href="/admin"
            className={cn(
              "text-base font-medium transition-colors hover:text-primary",
              pathname === "/admin" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Oversikt
          </Link>
          <Link
            href="/admin/gifts"
            className={cn(
              "text-base font-medium transition-colors hover:text-primary",
              pathname === "/admin/gifts" ||
                pathname.startsWith("/admin/gifts/")
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Gaver
          </Link>
          <Link
            href="/admin/categories"
            className={cn(
              "text-base font-medium transition-colors hover:text-primary",
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
              "text-base font-medium transition-colors hover:text-primary",
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
              "text-base font-medium transition-colors hover:text-primary",
              pathname === "/admin/received-gifts"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Mottatte gaver
          </Link>
          <Link
            href="/admin/uploaded-images"
            className={cn(
              "text-base font-medium transition-colors hover:text-primary",
              pathname === "/admin/uploaded-images"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Delte bilder
          </Link>
          <Link
            href="/admin/settings"
            className={cn(
              "text-base font-medium transition-colors hover:text-primary",
              pathname === "/admin/settings"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Innstillinger
          </Link>
        </SheetContent>
      </Sheet>
      {/* Desktop nav */}
      <nav className="hidden md:flex gap-6">
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
          href="/admin/uploaded-images"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/admin/uploaded-images"
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          Delte bilder
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
