import HttpStatus from 'http-status';
import ResponseStructure from '@shared/ResponseStructure'
var {
    getNamespace
} = require("cls-hooked");
import logger from '@shared/Logger';

export class ErrorHandler extends Error {
    status: any;
    constructor(error: any) {
        super();
        this.status = error.status;
        this.name = error.name ? error.name : HttpStatus[error.status];
        this.message = error.message ? error.message : HttpStatus[String(error.status) + '_MESSAGE'];
    }
}

export const handleError = (error: any, res: any) => {
    logger.error(`name- ${error.name}, message - ${error.message}, stack trace - ${error.stack}`);
    let traceId = getNamespace(process.env.CLS_NAMESPACE).get('traceId');

    error.status = error.status ? error.status : 500;
    error.name = error.name ? error.name : HttpStatus[500];
    error.message = error.message ? error.message : HttpStatus[String(500) + '_MESSAGE'];
    error.stack = error.stack;
    const response = new ResponseStructure(false, error.status, error.message, error.data, error, traceId);
    res.status(error.status).send(response);
};