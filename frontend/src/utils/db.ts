import { openDB } from 'idb';

const DB_NAME = 'chatney-db';
const STORE_NAME = 'messages';

export const db = await openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
  },
});

export async function saveMessage(message: any) {
  return db.put(STORE_NAME, message);
}

export async function getAllMessages() {
  return db.getAll(STORE_NAME);
}

export async function clearMessages() {
  return db.clear(STORE_NAME);
}