"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Files_Controller_1 = require("../controllers/Files-Controller");
const fileRouter = (0, express_1.Router)();
fileRouter.get("/:fileID", Files_Controller_1.Fetch__FILE__GET);
exports.default = fileRouter;
//# sourceMappingURL=fileRouter.js.map