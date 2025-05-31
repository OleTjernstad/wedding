import Image from "next/image";

export default function NumbersGrid() {
  // 3cm in px at 96dpi ≈ 113px
  const cellSize = 113;
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 print:p-0 print:bg-white">
      <style>{`
        @media print {
          body, html {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            background: white;
          }
          .a4-grid-print {
            width: 190mm;
            height: 277mm;
            margin: 0 auto;
            box-sizing: border-box;
            page-break-inside: avoid;
          }
          .a4-grid-cell {
            width: 19mm !important;
            height: 19mm !important;
            min-width: 19mm !important;
            min-height: 19mm !important;
            max-width: 19mm !important;
            max-height: 19mm !important;
            box-sizing: border-box;
          }
        }
      `}</style>
      <div
        className="grid border border-gray-400 a4-grid-print"
        style={{
          gridTemplateColumns: `repeat(10, 1fr)`,
          gridTemplateRows: `repeat(10, 1fr)`,
        }}
      >
        {numbers.map((num) => (
          <div
            key={num}
            className="relative flex items-center justify-center border border-gray-300 bg-white overflow-hidden a4-grid-cell"
            // width/height for screen, print uses CSS above
            style={{ width: cellSize, height: cellSize }}
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
