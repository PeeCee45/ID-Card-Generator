"use client";

import html2canvas from "html2canvas";

function randomString(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default async function convertHtmlToPng(
  readyDiv: HTMLDivElement | null,
  fileName = `ID-${randomString(7)}.png`
) {
  if (!readyDiv) return;

  try {
    // 1. Clone INCLUDING canvas pixels
    const clone = cloneWithCanvas(readyDiv) as HTMLDivElement;

    // 2. Export-only padding
    clone.style.paddingTop = "5px";

    // 3. Hide off-screen
    clone.style.position = "fixed";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";
    clone.style.color = "#111";
    clone.style.backgroundColor = "transparent";

    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      backgroundColor: null,
      scale: 1,
      useCORS: true,
    });

    document.body.removeChild(clone);

    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = fileName;
    link.click();

    return dataUrl;
  } catch (err) {
    console.error("Failed to export PNG", err);
  }
}


function cloneWithCanvas(source: HTMLElement) {
  const clone = source.cloneNode(true) as HTMLElement;

  const sourceCanvases = source.querySelectorAll("canvas");
  const clonedCanvases = clone.querySelectorAll("canvas");

  sourceCanvases.forEach((sourceCanvas, i) => {
    const clonedCanvas = clonedCanvases[i];
    if (!clonedCanvas) return;

    const ctx = clonedCanvas.getContext("2d");
    if (!ctx) return;

    clonedCanvas.width = sourceCanvas.width;
    clonedCanvas.height = sourceCanvas.height;

    ctx.drawImage(sourceCanvas, 0, 0);
  });

  return clone;
}
