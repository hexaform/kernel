import express from "express";
import { Container } from "@hexaform/container";
import { HttpError } from "./HttpError";

export const ExpressErrorHandler = (container: Container) =>
    (error: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
        let status: number;
        let output: string | null;

        if (error instanceof HttpError) {
            status = error.status;
            output = error.content;
        }
        else {
            status = 500;
            output = null;
        }

        response.status(status);
        response.header("Content-Type", "text/plain");
        response.send(output);
    };