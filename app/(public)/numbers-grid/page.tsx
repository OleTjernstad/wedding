"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function NumbersGrid() {
  const searchParams = useSearchParams();
  // Get the 'length' param from the URL, default to 100 if not present
  const lengthParam = searchParams.get("length");
  const numbersLength = lengthParam ? parseInt(lengthParam, 10) : 100;
  const numbers = Array.from({ length: numbersLength }, (_, i) => i + 1);

  return (
    <>
      <style jsx global>{`
        @media print {
          .numbers-grid-cell {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white ">
        <div
          className="grid border border-gray-400 w-full max-w-5xl mx-auto"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(115px, 1fr))`,
            gap: "8px",
          }}
        >
          {numbers.map((num) => (
            <div
              key={num}
              className="numbers-grid-cell relative flex items-center justify-center border border-gray-300 bg-white overflow-hidden"
              style={{ aspectRatio: "1 / 1", minWidth: 0 }}
            >
              <Image
                src="/android-chrome-192x192.png"
                alt="Watermark"
                fill
                style={{
                  objectFit: "contain",
                  opacity: 0.08,
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              <span
                className="font-bold text-4xl text-gray-800 z-10 select-none"
                style={{ fontSize: "2.5rem" }}
              >
                {num}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
