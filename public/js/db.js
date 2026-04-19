export let db = null;

export function initDB(callback) {
  const dbRequest = indexedDB.open("PeakAppDB", 1);

  dbRequest.onupgradeneeded = (e) => {
    db = e.target.result;
    db.createObjectStore("images");
  };

  dbRequest.onsuccess = (e) => {
    db = e.target.result;
    callback();
  };
}

export function storeImage(id, file) {
  if (!db) return;
  const tx = db.transaction("images", "readwrite");
  const store = tx.objectStore("images");
  store.put(file, id);
}

export function loadImage(id, callback) {
  if (!db) {
    callback(null);
    return;
  }

  const tx = db.transaction("images", "readonly");
  const store = tx.objectStore("images");
  const request = store.get(id);

  request.onsuccess = () => {
    if (request.result) {
      const url = URL.createObjectURL(request.result);
      callback(url);
    } else {
      callback(null);
    }
  };

  request.onerror = () => callback(null);
}