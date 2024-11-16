import cors from "cors";
import express from "express";
import { Configuration } from "@hexaform/configuration";
import { Container } from "@hexaform/container";
import { Logger } from "@hexaform/logger";
import { HttpKernel } from "./HttpKernel";
import { ExpressErrorHandler } from "./ExpressErrorHandler";
import { HttpRouter } from "./HttpRouter";
import { ExpressHttpRouter } from "./ExpressHttpRouter";

/**
 * Depends on [ express, Logger, Configuration, HttpRouter ]
 */
export class ExpressHttpKernel extends HttpKernel {
    private config: Configuration;
    private logger: Logger;
    private express: express.Application;

    constructor(container: Container, middleware: express.RequestHandler[] = []) {
        super(container);

        this.config = container.resolve(Configuration);
        this.logger = container.resolve(Logger);

        this.express = container.resolve(express);
        // this.express = express();
        this.express.set("x-powered-by", false);
        this.express.set("trust proxy", true);
        this.express.use(cors());
        // this.express.use(express.raw({
        //     limit: "50mb",
        //     type: ["application/octet-stream", "audio/*", "font/*", "image/*", "model/*", "text/*", "video/*"]
        // }));
        // this.express.use(express.json());
        // this.express.use(multer().none());
        // this.express.use(express.text());
        if (middleware.length) {
            this.express.use(...middleware);
        }
        let httpRouter: ExpressHttpRouter = container.resolve(HttpRouter);
        // this.express.use(Reflect.get(httpRouter, "expressRouter") as express.IRouter);
        this.express.use(httpRouter.getExpressRouter());
        this.express.use(ExpressErrorHandler(container));
    }

    listen() {
        let status = new Promise<void>((resolve, reject) => {
            let port = this.config.get("server.port", 3000);

            let server = this.express.listen(port, () => {
                this.logger.info(`Listening on port ${port}...`);
            });

            process.on("SIGINT", () => {
                process.kill(process.pid, "SIGTERM");
            });

            process.on("SIGTERM", () => {
                if (server.listening) {
                    this.logger.info("Shutting down...");
                    server.close(() => {
                        resolve();
                    });
                }
            });
        });

        return status;
    }
}