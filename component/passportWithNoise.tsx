"use client";

import { useRef, useEffect } from "react";

interface PassportWithNoiseProps {
  passport: File | null;
  width?: number;
  height?: number;
  noiseOpacity?: number;  // controls noise strength
  passportOpacity?: number; // controls only the image
}

export default function PassportWithNoise({
  passport,
  width = 89,
  height = 114,
  noiseOpacity = 0.2,
  passportOpacity = 1, // default fully opaque
}: PassportWithNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = passport ? URL.createObjectURL(passport) : "";
    img.onload = () => {
      // Draw passport image with desired opacity
      ctx.globalAlpha = passportOpacity;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Reset alpha for noise
      ctx.globalAlpha = 1;

      // Get image data for noise
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha > 0) {
          // subtle noise per channel
          const noiseR = (Math.random() - 0.5) * 50 * noiseOpacity;
          const noiseG = (Math.random() - 0.5) * 50 * noiseOpacity;
          const noiseB = (Math.random() - 0.5) * 50 * noiseOpacity;

          data[i] = Math.min(255, Math.max(0, data[i] + noiseR));
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noiseG));
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noiseB));
        }
      }

      ctx.putImageData(imageData, 0, 0);

      if (passport) URL.revokeObjectURL(img.src);
    };
  }, [passport, noiseOpacity, passportOpacity]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute top-0 left-0 w-[100%] h-[100%] rounded"
    />
  );
}
