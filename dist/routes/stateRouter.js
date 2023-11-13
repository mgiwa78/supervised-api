"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const State_Controller_1 = require("../controllers/State-Controller");
const stateRouter = (0, express_1.Router)();
stateRouter.post("/:workflowId", State_Controller_1.Create__STATE__POST);
exports.default = stateRouter;
//# sourceMappingURL=stateRouter.js.map