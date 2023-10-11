"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create__PERMISSION__POST = exports.Fetch__PERMISSIONS_WITH_ROLES__GET = exports.Fetch__PERMISSIONS__GET = void 0;
const permission_1 = require("../models/permission");
const role_1 = require("../models/role");
const Fetch__PERMISSIONS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permissions = yield permission_1.Permission.find();
        return res.json({ status: "success", data: permissions });
    }
    catch (error) {
        console.error("Error fetching permissions:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__PERMISSIONS__GET = Fetch__PERMISSIONS__GET;
const Fetch__PERMISSIONS_WITH_ROLES__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permissions = yield permission_1.Permission.find();
        const roles = yield role_1.Role.find();
        const all = permissions.map((perm) => {
            const r = roles.filter((role) => role.permissions.includes(perm._id));
            return {
                permission: perm,
                roles: r
            };
        });
        return res.json({ status: "success", data: all });
    }
    catch (error) {
        console.error("Error fetching permissions:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__PERMISSIONS_WITH_ROLES__GET = Fetch__PERMISSIONS_WITH_ROLES__GET;
const Create__PERMISSION__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const permission = new permission_1.Permission({ name });
        yield permission.save();
        return res.status(201).json({ message: "Permission created successfully" });
    }
    catch (error) {
        console.error("Error creating permission:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Create__PERMISSION__POST = Create__PERMISSION__POST;
//# sourceMappingURL=Permission-Controller.js.map