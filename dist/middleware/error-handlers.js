"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// import { RequestValidationError } from "../errors/request-validation-errors";
// import { DatabaseConnectionError } from "../errors/database-conection-error";
const custom_error_1 = require("../errors/custom-error");
const errorHandler = (err, req, res, next) => {
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    res.status(400).send({
        errors: [{ message: "Somthing went wrong" }]
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handlers.js.map