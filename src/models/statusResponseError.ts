export class StatusResponseError extends Error {

    statusCode: number;
    message: string;
    data: any;

    constructor(statusCode: number = 400, message: string = '', data: any = null) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}