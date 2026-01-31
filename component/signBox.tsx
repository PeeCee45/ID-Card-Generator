"use client";

import { useRef, useState, useEffect } from "react";


type SignaturePreviewProps = {
  signature: string | null;
};

export function SignaturePreview({ signature }: SignaturePreviewProps) {
  if (!signature) return null;

  return (
    <div className="border rounded p-3 bg-gray-50">
      <p className="text-sm text-gray-600 mb-2">Signature Preview</p>
      <img src={signature} alt="Signature" className="max-h-40 bg-white" />
    </div>
  );
}



type SignBoxProps = {
  onExport: (signature: string | null) => void;
};

export default function SignBox({ onExport }: SignBoxProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(4);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.imageSmoothingEnabled = true;
  }, []);

  const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const updateCursor = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setCursorPos(getPos(e.nativeEvent, canvas));
    exportSignature();
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    isDrawing.current = true;
    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    const pos = getPos(e.nativeEvent, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);

    updateCursor(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    updateCursor(e);

    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const pos = getPos(e.nativeEvent, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const handleMouseLeave = () => {
    setCursorPos(null);
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onExport(null);
  };

  const exportSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    onExport(canvas.toDataURL("image/png"));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Toolbar */}
      <div className="flex gap-3 items-center">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <input
          type="range"
          min={1}
          max={20}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />

        <button
          onClick={clearCanvas}
          className="px-3 py-1 rounded bg-gray-800 text-white text-sm"
        >
          Clear
        </button>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-64">
        <canvas
          ref={canvasRef}
          className="w-full h-full border rounded bg-white touch-none cursor-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}     
          onMouseUp={stopDrawing}
          onMouseLeave={handleMouseLeave}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {/* Red hover/draw cursor */}
        {cursorPos && (
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              left: cursorPos.x - size / 2,
              top: cursorPos.y - size / 2,
              width: size,
              height: size,
              backgroundColor: "red",
              opacity: isDrawing.current ? 0.9 : 0.5,
              boxShadow: "0 0 0 2px white",
            }}
          />
        )}
      </div>
    </div>
  );
}

