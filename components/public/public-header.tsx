import Link from "next/link"
import { GiftIcon } from "lucide-react"

export function PublicHeader() {
  return (
    <header className="bg-white border-b py-4">
      <div className="container flex justify-between items-center">
        <Link href="/public" className="flex items-center space-x-2">
          <GiftIcon className="h-6 w-6" />
          <span className="font-bold text-xl">Wedding Registry</span>
        </Link>

        <nav className="flex gap-4">
          <Link href="/public" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/public#about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link href="/public#contact" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}

