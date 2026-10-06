export const IMAGE_MAX_DIMENSION = 1920;
export const IMAGE_TARGET_SIZE = 600 * 1024;
export const IMAGE_STORAGE_LIMIT = 2 * 1024 * 1024;
export const IMAGE_INPUT_LIMIT = 8 * 1024 * 1024;

export async function optimizePhoto(file: File, maxSize = IMAGE_MAX_DIMENSION, quality = 0.82): Promise<Blob> {
  if (!file.size || file.size > IMAGE_INPUT_LIMIT) throw new Error("A fotó legfeljebb 8 MB lehet, és nem lehet üres.");
  if (!Number.isFinite(maxSize) || maxSize <= 0 || maxSize > IMAGE_MAX_DIMENSION || !Number.isFinite(quality) || quality <= 0 || quality > 1) throw new Error("Érvénytelen képoptimalizálási beállítás.");
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  let canvas: HTMLCanvasElement | null = null;
  try {
    if (!bitmap.width || !bitmap.height) throw new Error("A kép mérete nem állapítható meg.");
    const ratio = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    let width = Math.max(1, Math.round(bitmap.width * ratio));
    let height = Math.max(1, Math.round(bitmap.height * ratio));
    const drawingCanvas = document.createElement("canvas");
    canvas = drawingCanvas;
    const context = drawingCanvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("A böngésző nem támogatja a képfeldolgozást.");
    const encode = (type: string, q: number) => new Promise<Blob>((resolve, reject) => drawingCanvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("A kép tömörítése nem sikerült.")), type, q));
    const render = async (q: number) => {
      drawingCanvas.width = width; drawingCanvas.height = height;
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
      context.drawImage(bitmap, 0, 0, width, height);
      const webp = await encode("image/webp", q);
      return webp.type === "image/webp" ? webp : encode("image/jpeg", q);
    };
    let output = await render(quality);
    for (const q of [0.74, 0.66, 0.58]) {
      if (output.size <= IMAGE_TARGET_SIZE) break;
      output = await render(Math.min(quality, q));
    }
    for (let attempt = 0; attempt < 4 && output.size > IMAGE_TARGET_SIZE; attempt++) {
      const longest = Math.max(width, height);
      if (longest <= 720) break;
      const scale = Math.max(720 / longest, Math.min(0.9, Math.sqrt(IMAGE_TARGET_SIZE / output.size) * 0.94));
      width = Math.max(1, Math.round(width * scale)); height = Math.max(1, Math.round(height * scale));
      output = await render(Math.min(quality, 0.72));
    }
    if (!output.size || output.size > IMAGE_STORAGE_LIMIT || !["image/webp", "image/jpeg"].includes(output.type)) throw new Error("A fotó nem optimalizálható biztonságosan 2 MB alá.");
    return output;
  } finally {
    bitmap.close();
    if (canvas) { canvas.width = 0; canvas.height = 0; }
  }
}

export function photoFormat(blob: Blob) {
  if (!blob.size || blob.size > IMAGE_STORAGE_LIMIT) throw new Error("A szinkronizált fotó legfeljebb 2 MB lehet.");
  const extension = ({ "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png" } as Record<string, string>)[blob.type];
  if (!extension) throw new Error("A fotó formátuma nem támogatott.");
  return { extension, mimeType: blob.type };
}

export async function savePhotoBatch<T>(files: T[], save: (file: T) => Promise<string>) {
  const ids: string[] = [];
  const errors: string[] = [];
  for (const file of files) {
    try { ids.push(await save(file)); }
    catch (error) { errors.push(error instanceof Error ? error.message : "A fotó mentése nem sikerült."); }
  }
  return { ids, errors };
}
