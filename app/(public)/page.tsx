import { View } from "./view";
import { getCategories } from "@/lib/category-service";

export default async function WeddingRegistry() {
  const categories = await getCategories();
  return (
    <div className="min-h-screen bg-white">
      <View categories={categories} />
      {/* Footer */}
      <footer className="bg-purple-900 text-white py-8 px-4 text-center mt-16">
        <p>Miriam & Ole Tosten Bryllupsliste</p>
        <p className="text-purple-200 text-sm mt-2">21. juni 2025</p>
        <div className="mt-4">
          <a
            href="/admin/login"
            className="text-purple-300 text-xs hover:text-white transition-colors"
          >
            Administrasjon
          </a>
        </div>
      </footer>
    </div>
  );
}
