"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const usersRouter_1 = __importDefault(require("./usersRouter"));
const departmentRouter_1 = __importDefault(require("./departmentRouter"));
const rolesRouter_1 = __importDefault(require("./rolesRouter"));
const permissionsRoute_1 = __importDefault(require("./permissionsRoute"));
const documentsRouter_1 = __importDefault(require("./documentsRouter"));
const reviewSessionRouter_1 = __importDefault(require("./reviewSessionRouter"));
const commentsRouter_1 = __importDefault(require("./commentsRouter"));
const projectsRouter_1 = __importDefault(require("./projectsRouter"));
const proposalRouter_1 = __importDefault(require("./proposalRouter"));
const fileRouter_1 = __importDefault(require("./fileRouter"));
const workflowRouter_1 = __importDefault(require("./workflowRouter"));
const stateRouter_1 = __importDefault(require("./stateRouter"));
let rootRouter = (0, express_1.Router)();
rootRouter.get("/", (req, res) => {
    res.send("Supervised API is online and running");
});
////
rootRouter.use("/auth", auth_1.default);
rootRouter.use("/reviewSessions", reviewSessionRouter_1.default);
rootRouter.use("/roles", rolesRouter_1.default);
rootRouter.use("/comments", commentsRouter_1.default);
rootRouter.use("/projects", projectsRouter_1.default);
rootRouter.use("/users", usersRouter_1.default);
rootRouter.use("/departments", departmentRouter_1.default);
rootRouter.use("/documents", documentsRouter_1.default);
rootRouter.use("/workflows", workflowRouter_1.default);
rootRouter.use("/proposals", proposalRouter_1.default);
rootRouter.use("/permissions", permissionsRoute_1.default);
rootRouter.use("/states", stateRouter_1.default);
rootRouter.use("/files", fileRouter_1.default);
exports.default = rootRouter;
//# sourceMappingURL=rootRouter.js.map