"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorisedError = void 0;
const custom_error_1 = require("./custom-error");
class NotAuthorisedError extends custom_error_1.CustomError {
    constructor() {
        super("You are not authorised");
        this.statusCode = 401;
        //Only to extend a built in class
        Object.setPrototypeOf(this, NotAuthorisedError.prototype);
    }
    serializeErrors() {
        return [{ message: "You are not authorised" }];
    }
}
exports.NotAuthorisedError = NotAuthorisedError;
//# sourceMappingURL=not-authorised-error.js.map