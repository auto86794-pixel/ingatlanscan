const DB_NAME = "ingatlanscan-photos";
const STORE = "photos";
const VERSION = 2;

export type PhotoSyncStatus = "pending" | "uploading" | "synced" | "error";
export type StoredPhoto = {
  id: string; intakeId: string; roomId: string; blob: Blob; createdAt: string;
  syncStatus?: PhotoSyncStatus; syncError?: string | null; storagePath?: string | null; syncedAt?: string | null;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("intakeId", "intakeId", { unique: false });
        store.createIndex("roomId", "roomId", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
export async function savePhoto(photo: StoredPhoto) { const db=await openDb(); await new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,"readwrite");tx.objectStore(STORE).put({...photo,syncStatus:photo.syncStatus||"pending"});tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});db.close(); }
export async function updatePhotoSync(id:string, patch:Partial<Pick<StoredPhoto,"syncStatus"|"syncError"|"storagePath"|"syncedAt">>) { const db=await openDb(); await new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,"readwrite");const store=tx.objectStore(STORE);const req=store.get(id);req.onsuccess=()=>{if(req.result) store.put({...req.result,...patch});};tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});db.close(); }
export async function getPhotos(ids:string[]):Promise<StoredPhoto[]> { if(!ids.length)return[];const db=await openDb();const photos=await Promise.all(ids.map(id=>new Promise<StoredPhoto|null>((resolve,reject)=>{const tx=db.transaction(STORE,"readonly");const request=tx.objectStore(STORE).get(id);request.onsuccess=()=>resolve(request.result||null);request.onerror=()=>reject(request.error)})));db.close();return photos.filter((p):p is StoredPhoto=>Boolean(p)); }
export async function getIntakePhotos(intakeId:string):Promise<StoredPhoto[]> { const db=await openDb();const photos=await new Promise<StoredPhoto[]>((resolve,reject)=>{const tx=db.transaction(STORE,"readonly");const req=tx.objectStore(STORE).index("intakeId").getAll(intakeId);req.onsuccess=()=>resolve(req.result||[]);req.onerror=()=>reject(req.error)});db.close();return photos; }
export async function deletePhoto(id:string){const db=await openDb();await new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,"readwrite");tx.objectStore(STORE).delete(id);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});db.close();}
export async function deleteIntakePhotos(intakeId:string){const db=await openDb();await new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,"readwrite");const index=tx.objectStore(STORE).index("intakeId");const request=index.openCursor(IDBKeyRange.only(intakeId));request.onsuccess=()=>{const cursor=request.result;if(cursor){cursor.delete();cursor.continue();}};tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});db.close();}
export async function resizeImage(file:File,maxSize=1920,quality=0.82):Promise<Blob>{const bitmap=await createImageBitmap(file);const ratio=Math.min(1,maxSize/Math.max(bitmap.width,bitmap.height));const width=Math.max(1,Math.round(bitmap.width*ratio));const height=Math.max(1,Math.round(bitmap.height*ratio));const canvas=document.createElement("canvas");canvas.width=width;canvas.height=height;const ctx=canvas.getContext("2d");if(!ctx)throw new Error("A kép feldolgozása nem sikerült.");ctx.drawImage(bitmap,0,0,width,height);bitmap.close();return await new Promise<Blob>((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error("A kép tömörítése nem sikerült.")),"image/webp",quality));}
