import Link from "next/link"

export function PublicFooter() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Wedding Registry</p>
          </div>

          <div className="flex gap-4">
            <Link href="/admin" className="text-sm text-gray-600 hover:text-primary">
              Admin Login
            </Link>
            <Link href="/public/privacy" className="text-sm text-gray-600 hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/public/terms" className="text-sm text-gray-600 hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

