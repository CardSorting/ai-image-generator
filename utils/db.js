import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

// Web implementation using localStorage
const webDb = {
  images: [],
  lastId: 0,

  getNextId() {
    this.lastId += 1;
    return this.lastId;
  },

  loadFromStorage() {
    const stored = localStorage.getItem('aiimages');
    if (stored) {
      this.images = JSON.parse(stored);
      this.lastId = Math.max(...this.images.map(img => img.id), 0);
    }
  },

  saveToStorage() {
    localStorage.setItem('aiimages', JSON.stringify(this.images));
  }
};

// Native implementation using SQLite
const nativeDb = !isWeb ? SQLite.openDatabase('aiimages.db') : null;

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    if (isWeb) {
      try {
        webDb.loadFromStorage();
        resolve();
      } catch (error) {
        reject(error);
      }
    } else {
      nativeDb.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, prompt TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)',
          [],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    }
  });
};

export const saveImage = (url, prompt) => {
  return new Promise((resolve, reject) => {
    if (isWeb) {
      try {
        const id = webDb.getNextId();
        const newImage = {
          id,
          url,
          prompt,
          created_at: new Date().toISOString()
        };
        webDb.images.unshift(newImage);
        webDb.saveToStorage();
        resolve(id);
      } catch (error) {
        reject(error);
      }
    } else {
      nativeDb.transaction(tx => {
        tx.executeSql(
          'INSERT INTO images (url, prompt) VALUES (?, ?)',
          [url, prompt],
          (_, { insertId }) => resolve(insertId),
          (_, error) => reject(error)
        );
      });
    }
  });
};

export const getImages = () => {
  return new Promise((resolve, reject) => {
    if (isWeb) {
      try {
        resolve(webDb.images);
      } catch (error) {
        reject(error);
      }
    } else {
      nativeDb.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM images ORDER BY created_at DESC',
          [],
          (_, { rows: { _array } }) => resolve(_array),
          (_, error) => reject(error)
        );
      });
    }
  });
};

export const deleteImage = (id) => {
  return new Promise((resolve, reject) => {
    if (isWeb) {
      try {
        webDb.images = webDb.images.filter(img => img.id !== id);
        webDb.saveToStorage();
        resolve();
      } catch (error) {
        reject(error);
      }
    } else {
      nativeDb.transaction(tx => {
        tx.executeSql(
          'DELETE FROM images WHERE id = ?',
          [id],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    }
  });
};
