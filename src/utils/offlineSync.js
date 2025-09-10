import { updateDoc } from "firebase/firestore";

let queue = JSON.parse(localStorage.getItem("offlineQueue") || "[]");

export const isOnline = () => window.navigator.onLine;

export const queueUpdate = (ref, updates) => {
  queue.push({ path: ref.path, updates });
  localStorage.setItem("offlineQueue", JSON.stringify(queue));
};

export const flushQueue = async () => {
  if (!isOnline() || !queue.length) return;
  console.log("Flushing offline queue...");
  const newQueue = [];
  for (const item of queue) {
    try {
      await updateDoc(window.db.doc(item.path), item.updates);
    } catch (err) {
      console.error("Failed to flush update:", err);
      newQueue.push(item); 
    }
  }
  queue = newQueue;
  localStorage.setItem("offlineQueue", JSON.stringify(queue));
};
