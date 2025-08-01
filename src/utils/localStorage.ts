import { STORAGE_KEYS } from '@constants/localStorage';

export type StorageKeysType = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

class StorageUtility {
  static setItem<T>(key: StorageKeysType, data: T): void {
    try {
      const jsonValue = JSON.stringify(data);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error while setting item from LocalStorage: ', error);
    }
  }

  static getItem<T>(key: StorageKeysType): T | null {
    try {
      const jsonValue = localStorage.getItem(key);
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      return value;
    } catch (error) {
      console.error('Error while getting item from LocalStorage: ', error);
      return null;
    }
  }

  static removeItem(key: StorageKeysType): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error while removing item from LocalStorage: ', error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error while cleaning LocalStorage: ', error);
    }
  }
}

export { StorageUtility };
