"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Department_Controller_1 = require("../controllers/Department-Controller");
const departmentRouter = (0, express_1.Router)();
departmentRouter.get("/", Department_Controller_1.Fetch__DEPARTMENTS__GET);
exports.default = departmentRouter;
//# sourceMappingURL=departmentRouter.js.map