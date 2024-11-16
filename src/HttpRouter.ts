import { HttpMethod } from "./HttpMethod";
import { Controller } from "./Controller";

export abstract class HttpRouter {
    abstract addRoute(method: HttpMethod, path: string, controller: typeof Controller, action: string, contentType: string): void;
}
