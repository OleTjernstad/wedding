"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { GiftIcon } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/admin" className="flex items-center space-x-2">
        <GiftIcon className="h-6 w-6" />
        <span className="font-bold inline-block">Gift Registry</span>
      </Link>
      <nav className="flex gap-6">
        <Link
          href="/admin"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/admin" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/admin/gifts"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/admin/gifts" || pathname.startsWith("/admin/gifts/")
              ? "text-primary"
              : "text-muted-foreground",
          )}
        >
          Gifts
        </Link>
        <Link
          href="/admin/categories"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/admin/categories" || pathname.startsWith("/admin/categories/")
              ? "text-primary"
              : "text-muted-foreground",
          )}
        >
          Categories
        </Link>
        <Link
          href="/admin/reservations"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/admin/reservations" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Reservations
        </Link>
        <Link
          href="/admin/settings"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/admin/settings" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Settings
        </Link>
      </nav>
    </div>
  )
}

