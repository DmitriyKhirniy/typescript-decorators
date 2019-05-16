import { CacheStorageService } from './cache-storage.service';

export enum SafeDecoratorLogLevel {
    Default,
    Console
}

export const serializeObject = (obj?: object): string => {
    let str = '';

    if (obj) {
        Object.keys(obj)
            .forEach((key: string) => {
                if (str !== '') {
                    str += '&';
                }

                str += `${key}=${encodeURIComponent(obj[key])}`;
            });
    }

    return str;
};

export interface CacheDecoratorParams {
    cacheKey?: string;
    logLevel?: number;
    useParamsAsKeys?: boolean;
}


/**
 * Decorator for caching method returning result by its string params
 */
export function CacheResult(params: CacheDecoratorParams = {}, cachingService = CacheStorageService): Function {
    return function(target, key: string, descriptor): Function {

        /* save a reference to the original method this way we keep the values currently in the
         * descriptor and don't overwrite what another decorator might have done to the descriptor.
         */
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        const originalMethod = descriptor.value;

        descriptor.value = function(): object {
            let savedKey = params.cacheKey || key;

            if (params.useParamsAsKeys) {
                savedKey = `${savedKey}-${serializeObject(arguments)}`;
            }

            const cacheResult = cachingService.get(savedKey);

            if (cacheResult) {
                if (params.logLevel === SafeDecoratorLogLevel.Console) {
                    console.log('Returning from cache: ', cacheResult); // tslint:disable-line:no-console
                }

                return cacheResult;
            }

            const result = originalMethod.apply(this, arguments);

            cachingService.set(savedKey, result);

            return result;
        };

        /*return edited descriptor as opposed to overwriting the descriptor*/
        return descriptor;
    };
}
