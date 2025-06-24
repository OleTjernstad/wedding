"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import QRCode from "@/components/qr-code";
import SearchBar from "@/components/search-bar";
import { useState } from "react";

interface ViewProps {
  categories: Category[];
}
export function View({ categories }: ViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-100 to-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-purple-800 mb-2 font-handwriting">
          Miriam & Ole Tosten
        </h1>
        <p className="text-xl text-purple-600 mb-6">Ønskeliste</p>
        <p className="text-gray-600 mb-8">21. juni 2025</p>
        {/* <SearchBar onSearch={handleSearch} /> */}
      </div>

      {/* Registry Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* <CategoryTabs searchQuery={searchQuery} categories={categories} /> */}

        <div className="max-w-2xl mx-auto bg-purple-50 rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-bold text-purple-800 mb-4 font-handwriting">
            Takk for alle gavene vi fikk, og det huggale selskapet.
          </h2>
          <p className="text-lg text-purple-700 mb-2">
            Nå skal vi la alt synke inn og plutselig dukker det opp et takkekort
          </p>
        </div>

        {/* Share Section */}
        <div className="mt-16 bg-purple-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Del denne ønskelisten
          </h2>
          <p className="text-gray-600 mb-6">
            Del denne Ønskelisten med venner og familie
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <QRCode url={process.env.NEXT_PUBLIC_SERVER_URL ?? ""} />
              <p className="mt-2 text-sm text-gray-500">
                Skann for å se ønskelisten
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Lenke kopiert til utklippstavlen!");
                }}
              >
                Kopier lenke
              </Button>
              <Button
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
                onClick={() => {
                  window.location.href = `mailto:?subject=Ønskeliste for Miriam og Ole&body=Se Ønskelisten her: ${window.location.href}`;
                }}
              >
                Del via e-post
              </Button>
            </div>
          </div>
        </div>

        {/* Upload Images Link */}
        <div className="mt-16 text-center">
          <a
            href="/upload-images"
            className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg shadow transition-colors"
          >
            Har du bilder fra bryllupet? Del dem med oss her!
          </a>
        </div>
      </div>
    </>
  );
}
