import Image from "next/image";

export default function NumbersGrid() {
  // 3cm in px at 96dpi ≈ 113px
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 print:p-0 print:bg-white">
      <div
        className="grid border border-gray-400 w-full max-w-5xl mx-auto"
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(70px, 1fr))`,
          gap: "8px",
        }}
      >
        {numbers.map((num) => (
          <div
            key={num}
            className="relative flex items-center justify-center border border-gray-300 bg-white overflow-hidden"
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
  );
}
