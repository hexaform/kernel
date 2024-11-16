import { HttpResponse } from "./HttpResponse";

export class HttpError extends HttpResponse{

    constructor(status: number, content: string = "") {
        super(status, content);
    }
}