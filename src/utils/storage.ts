import { storage } from 'src/store/mmk-store'

export const getItem = async (key: string) => {
  return await storage.getString(key);
};

export const setItem = async (key: string, value: string) => {
  return await storage.set(key, value);
};

export const clearData = async () => {
  return await storage.clearAll();
};
