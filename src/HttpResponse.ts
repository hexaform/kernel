export class HttpResponse {
    readonly status: number;
    readonly content: string;

    constructor(status: number, content: string = "") {
        this.status = status;
        this.content = content;
    }
}