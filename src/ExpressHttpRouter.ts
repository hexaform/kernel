import express from "express";
import { Container } from "@hexaform/container";
import { HttpRouter } from "./HttpRouter";
import { HttpMethod } from "./HttpMethod";
import { Controller } from "./Controller";
import { HttpError } from "./HttpError";
import { HttpServerError } from "./HttpServerError";
import { Logger } from "@hexaform/logger";

export class ExpressHttpRouter extends HttpRouter {
    private container: Container;
    private expressRouter: express.IRouter;

    constructor(container: Container, router: express.Router) {
        super();

        this.container = container;
        this.expressRouter = router;
    }

    getExpressRouter() {
        return this.expressRouter;
    }

    addRoute(method: HttpMethod, path: string, controllerClass: typeof Controller, action: string, contentType: string): void {
        let middleware = [];
        switch (contentType) {
            case "application/json":
                middleware.push(express.json());
                break;

            case "application/octet-stream":
            case "audio/*":
            case "font/*":
            case "image/*":
            case "model/*":
            case "text/*":
            case "video/*":
                middleware.push(express.raw({
                    limit: "50mb",
                    type: [contentType]
                }));
                break;

            case "text/plain":
                middleware.push(express.text());
                break;
        }

        /** Client */
        this.expressRouter[method](path, ...middleware, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                /** Receiver factory */
                let controller: Controller = this.container.construct(controllerClass);
                /** Receiver factory end */

                /** Invoker */
                await controller[action](request, response);
                /** Invoker end */

                if (!response.headersSent) {
                    response.status(204).send();
                }
            } catch (error: any) {
                if (error instanceof HttpError) {
                    next(error);
                } else {
                    const log: Logger = this.container.resolve(Logger);
                    switch (true) {
                        case error instanceof Error:
                            log.error(error.stack || error.toString());
                            break;

                        case typeof error === "object":
                            log.error(error.constructor.name, error);
                            break;

                        default:
                            console.error("Unhandled error", error);
                    }

                    next(new HttpServerError());
                }
            }
        });
    }
}