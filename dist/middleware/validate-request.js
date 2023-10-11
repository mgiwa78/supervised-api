"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRequest = void 0;
const express_validator_1 = require("express-validator");
const ValidateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const validationErrors = errors.array().map((error) => ({
            message: error.msg,
            field: error === null || error === void 0 ? void 0 : error.path
        }));
        return res.status(400).json({ status: "error", errors: validationErrors });
    }
    next();
};
exports.ValidateRequest = ValidateRequest;
//# sourceMappingURL=validate-request.js.map