export class CacheStorageService {

    static cache: Map<string, {}> = new Map<string, {}>();

    static get<Type>(key: string): Type {
        return this.cache.get(key) as Type;
    }

    static set<Type>(key: string, value: string): void {
        this.cache.set(key, value);
    }
}
