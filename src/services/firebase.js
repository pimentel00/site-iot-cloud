import { initializeApp, deleteApp } from 'firebase/app';
import { getDatabase, ref, onValue, query, limitToLast } from 'firebase/database';

let app = null;
let db = null;

export function initFirebase(config) {
  if (app) {
    try { deleteApp(app); } catch (e) { /* ignore */ }
  }
  app = initializeApp(config, 'rioclima-' + Date.now());
  db = getDatabase(app);
  return db;
}

export function getDb() {
  return db;
}

export function isInitialized() {
  return db !== null;
}

export function subscribeToData(path, limit, callback) {
  if (!db) return null;
  const dataRef = query(ref(db, path), limitToLast(limit));
  return onValue(dataRef, (snapshot) => {
    const data = [];
    snapshot.forEach((child) => {
      data.push({ id: child.key, ...child.val() });
    });
    data.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
    callback(data);
  }, (error) => {
    console.error('Firebase subscription error:', error);
    callback([], error);
  });
}

export function testConnection(path) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Firebase não inicializado'));
      return;
    }
    const dataRef = query(ref(db, path), limitToLast(1));
    const timeout = setTimeout(() => reject(new Error('Timeout: sem resposta do Firebase')), 10000);
    onValue(dataRef, (snapshot) => {
      clearTimeout(timeout);
      if (snapshot.exists()) {
        resolve(snapshot.val());
      } else {
        reject(new Error('Nenhum dado encontrado no caminho: ' + path));
      }
    }, (error) => {
      clearTimeout(timeout);
      reject(error);
    }, { onlyOnce: true });
  });
}
