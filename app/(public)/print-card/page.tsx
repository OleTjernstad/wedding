import QRCode from "@/components/qr-code";
import Image from "next/image";

export default function PrintCard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 print:p-0 print:bg-white">
      <div
        className="flex flex-col items-center justify-center border border-gray-400 bg-white rounded-lg shadow-lg p-8 relative w-full max-w-[20rem] mx-auto"
        style={{ aspectRatio: "1/1.4", minWidth: 0 }}
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
            Fint om dere deler bilder dere tar i dag med oss
          </p>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <QRCode
              url={
                (process.env.NEXT_PUBLIC_SERVER_URL ?? "") + "/upload-images"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
