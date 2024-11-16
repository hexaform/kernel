import { QueryBus, CommandBus } from "@hexaform/cqrs";
import { HttpRouter } from "./HttpRouter";
import { HttpMethod } from "./HttpMethod";
import { Controller } from "./Controller";

let routerResolver;
const routerPromise: Promise<HttpRouter> = new Promise((resolve, reject) => {
    routerResolver = resolve;
});

export function Route(method: HttpMethod, path: string, contentType: string = "application/json") {
    return function (target: Controller, key: string, descriptor: PropertyDescriptor): void {
        let controller = target.constructor as typeof Controller;

        routerPromise.then((router: HttpRouter) => {
            router.addRoute(method, path, controller, key, contentType);
            if (!controller.hasOwnProperty("reflect:paramtypes")) {
                try {
                    Object.defineProperty(controller, "reflect:paramtypes", {
                        get() {
                            return [CommandBus, QueryBus];
                        }
                    });
                } catch (e: any) {
                    console.log(controller, e.message, "Ignoring...");
                }
            }
        });
    }
}

Route.useRouter = function (router: HttpRouter) {
    routerResolver(router);
}