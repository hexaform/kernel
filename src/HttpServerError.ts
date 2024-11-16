import { HttpError } from "./HttpError";

export class HttpServerError extends HttpError {
    constructor(status: number = 500, content: string = "") {
        super(status, content);
    }
}