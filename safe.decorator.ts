export interface SafeDecoratorParams<T> {
    logLevel?: number;
    returnValue?: T;
}


export enum SafeDecoratorLogLevel {
    Default,
    Console
}

export function Safe<T>(params: SafeDecoratorParams<T> = {}): Function {
    return function(target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): TypedPropertyDescriptor<Function> {
        const originalMethod = descriptor.value;
        const logLevel = params.logLevel || SafeDecoratorLogLevel.Default;

        descriptor.value = function SafeWrapper(): SafeDecoratorParams<T> | false {
            try {
                return originalMethod.apply(this, arguments);
            } catch (error) {
                if (logLevel === SafeDecoratorLogLevel.Console) { console.error(error); }

                if (logLevel === SafeDecoratorLogLevel.Default) {
                    this.errorHandler.handleError(error);
                }

                return params.returnValue || false;
            }
        };

        return descriptor;
    };
}
