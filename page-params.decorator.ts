export interface PageParamsOptions {
    key: string;
    paramName?: string;
    type?: 'number' | 'string';
    redirectTo: string;
}


export function PageParams(options: PageParamsOptions): Function {
    return function OutsideZone(targetClass, functionName: string, descriptor): Function {

        descriptor.value = function(): void {
            if (!this.route) {
                throw new Error("Class with 'PageParams' decorator should have 'route' class property with 'ActivatedRoute' class.");
            }

            const params: Params = (this.route as ActivatedRoute).snapshot.params;
            const param = params[options.paramName || 'id'];
            const paramType = options.type || 'number';

            if (paramType === 'number') {
                if (Number.isNaN(Number(param))) {
                    if (!this.router) {
                        throw new Error("Class with 'PageParams' decorator should have 'router' class property with 'Router' class.");
                    }

                    this.router.navigate([options.redirectTo]);

                    return;
                }

                this[options.key] = Number(param);
            } else {
                this[options.key] = param;
            }

        };

        return descriptor;
    };
}
