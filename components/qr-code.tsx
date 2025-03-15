"use client"

import { useEffect, useRef } from "react"
import QRCodeLibrary from "qrcode"

interface QRCodeProps {
  url: string
  size?: number
}

export default function QRCode({ url, size = 150 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      QRCodeLibrary.toCanvas(
        canvasRef.current,
        url,
        {
          width: size,
          margin: 2,
          color: {
            dark: "#6b21a8", // Purple 800
            light: "#ffffff",
          },
        },
        (error) => {
          if (error) console.error(error)
        },
      )
    }
  }, [url, size])

  return <canvas ref={canvasRef} />
}

