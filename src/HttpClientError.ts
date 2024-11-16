import { HttpError } from "./HttpError";

export class HttpClientError extends HttpError {
    constructor(status: number = 400) {
        super(status);
    }
}