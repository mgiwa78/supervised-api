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
let rootRouter = (0, express_1.Router)();
rootRouter.get("/", (req, res) => {
    res.send("Supervised API is online and running");
});
////
rootRouter.use("/auth", auth_1.default);
// rootRouter.use("/organizations", organizationRouter);
// rootRouter.use("/categories", categoryRouter);
// rootRouter.use("/rooms", roomRouter);
// rootRouter.use("/posts", postRouter);
// rootRouter.use("/products", productRouter);
// rootRouter.use("/requests", requestRouter);
rootRouter.use("/roles", rolesRouter_1.default);
rootRouter.use("/users", usersRouter_1.default);
rootRouter.use("/departments", departmentRouter_1.default);
rootRouter.use("/permissions", permissionsRoute_1.default);
exports.default = rootRouter;
//# sourceMappingURL=rootRouter.js.map