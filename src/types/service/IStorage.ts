export interface IStorageService {
    save(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
}