import { StorageService } from './storage.service';

export enum StorageType  { Local , Session }

export function FeatureFlipper(key: string, storageType: StorageType = StorageType.Local, methodName?: string): Function {
    return (target: Object, propName: string) => {
        const method: string = methodName || key;

        window[`enable${method}`] = function(): void {
            if (storageType === StorageType.Local) {
                StorageService.setItem(key, true, true);
            } else {
                StorageService.setItem(key, true, false);
            }
            location.reload();
        };

        window[`disable${method}`] = function(): void {
            if (storageType === StorageType.Local) {
                StorageService.setItem(key, false, true);
            } else {
                StorageService.setItem(key, false, false);
            }

            location.reload();
        };
    };
}
