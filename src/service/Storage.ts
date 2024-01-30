import AsyncStorage from '@react-native-async-storage/async-storage';
import {IStorageService} from "types/service/IStorage";

export class StorageService implements IStorageService {
  async save(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      const item = await AsyncStorage.getItem(key);
      return item;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};