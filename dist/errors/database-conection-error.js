"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const custom_error_1 = require("./custom-error");
class DatabaseConnectionError extends custom_error_1.CustomError {
    constructor() {
        super("Error Connecting to database");
        this.statusCode = 500;
        this.reason = "Error Connecting to database";
        //Only to extend a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
//# sourceMappingURL=database-conection-error.js.map