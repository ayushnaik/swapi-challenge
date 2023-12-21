export default class ResponseStructure {
    success: boolean;
    status: number;
    message: string;
    data: {};
    errors: {};
    traceId: string;
    constructor(
        success: boolean,
        status: number,
        message: string,
        data: {},
        errors: {},
        traceId: string,
    ) {
        this.success = success || false;
        this.status = status || 200;
        this.message = message || "";
        this.data = data || {};
        this.errors = errors || {};
        this.traceId = traceId || "";
    }
}