import assert from "node:assert/strict";
import test from "node:test";
import { optimizePhoto, photoFormat, savePhotoBatch, IMAGE_STORAGE_LIMIT, IMAGE_TARGET_SIZE } from "./image-optimization.ts";

async function browserFixture(run: (draws: number[][], closed: () => boolean) => Promise<void>, options: { fallback?: boolean; oversized?: boolean; small?: boolean } = {}) {
  const originalDocument = globalThis.document;
  const originalBitmap = globalThis.createImageBitmap;
  const draws: number[][] = [];
  let closed = false;
  const canvas = { width: 0, height: 0,
    getContext: () => ({ fillStyle: "", fillRect() {}, drawImage(_bitmap: unknown, _x: number, _y: number, w: number, h: number) { draws.push([w, h]); } }),
    toBlob(callback: (blob: Blob) => void, type: string, quality: number) {
      const size = options.oversized ? IMAGE_STORAGE_LIMIT + 1 : Math.ceil(canvas.width * canvas.height * quality * 0.35);
      callback(new Blob([new Uint8Array(size)], { type: options.fallback && type === "image/webp" ? "image/png" : type }));
    },
  };
  globalThis.document = { createElement: () => canvas } as unknown as Document;
  globalThis.createImageBitmap = (async () => ({ width: options.small ? 160 : 4000, height: options.small ? 120 : 3000, close() { closed = true; } })) as unknown as typeof createImageBitmap;
  try { await run(draws, () => closed); }
  finally { globalThis.document = originalDocument; globalThis.createImageBitmap = originalBitmap; }
}

const photo = () => new File([new Uint8Array(100)], "photo.jpg", { type: "image/jpeg" });

test("large photos are resized, optimized toward target size, and decoded resources are released", async () => {
  await browserFixture(async (draws, closed) => {
    const output = await optimizePhoto(photo());
    assert.equal(output.type, "image/webp");
    assert.ok(output.size <= IMAGE_TARGET_SIZE);
    assert.deepEqual(draws[0], [1920, 1440]);
    assert.equal(closed(), true);
  });
});

test("small photos are not enlarged", async () => {
  await browserFixture(async draws => { await optimizePhoto(photo()); assert.deepEqual(draws[0], [160, 120]); }, { small: true });
});

test("browsers without WebP encoding use JPEG and metadata matches the actual result", async () => {
  await browserFixture(async () => {
    const output = await optimizePhoto(photo());
    assert.deepEqual(photoFormat(output), { extension: "jpg", mimeType: "image/jpeg" });
  }, { fallback: true });
});

test("an image that cannot fit the storage limit fails safely and releases resources", async () => {
  await browserFixture(async (_draws, closed) => {
    await assert.rejects(optimizePhoto(photo()), /2 MB/);
    assert.equal(closed(), true);
  }, { oversized: true });
});

test("unsupported or oversized stored photos are rejected before upload", () => {
  assert.throws(() => photoFormat(new Blob(["test"], { type: "image/gif" })), /formátuma/);
  assert.throws(() => photoFormat(new Blob([new Uint8Array(IMAGE_STORAGE_LIMIT + 1)], { type: "image/webp" })), /2 MB/);
});

test("a failed middle photo preserves successful photo IDs and the remaining photos are still processed", async () => {
  const result = await savePhotoBatch(["first", "bad", "last"], async value => {
    if (value === "bad") throw new Error("invalid photo");
    return value;
  });
  assert.deepEqual(result, { ids: ["first", "last"], errors: ["invalid photo"] });
});
