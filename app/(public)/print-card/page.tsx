import Image from "next/image";
import QRCode from "@/components/qr-code";

export default function PrintCard() {
  return (
    <div
      className="min-h-screen bg-white p-8 print:p-0 print:bg-white flex items-center justify-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        className="grid grid-cols-2 grid-rows-2 w-full h-full"
        style={{
          width: "210mm", // A4 width
          height: "297mm", // A4 height
          maxWidth: "100vw",
          maxHeight: "100vh",
          gap: "30px", // 6mm white space around each card
          background: "white", // ensure white background for print
          boxSizing: "border-box",
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center border border-gray-400 bg-white rounded-lg relative w-full h-full max-w-full max-h-full"
            style={{
              aspectRatio: "1/1.4",
              minWidth: 0,
              // margin: "30px",
              boxSizing: "border-box",
              // Remove shadow for clean cut lines
            }}
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
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
              <h1 className="font-bold text-2xl text-purple-800 mb-4 text-center">
                Takk for at du deler!
              </h1>
              <p className="text-lg text-gray-700 mb-8 text-center max-w-xs">
                Fint om dere deler bilder dere tar i dag
              </p>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <QRCode
                  url={
                    (process.env.NEXT_PUBLIC_SERVER_URL ?? "") +
                    "/upload-images"
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
