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
exports.Update__ROLES__PUT = exports.Create__ROLES__POST = exports.Fetch__ROLES_WITH_USERS__GET = exports.Fetch__ROLES__GET = void 0;
const role_1 = require("../models/role");
const permission_1 = require("../models/permission");
const user_1 = require("../models/user");
const Fetch__ROLES__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield role_1.Role.find().populate("permissions").exec();
        return res.json({ status: "success", data: roles });
    }
    catch (error) {
        console.error("Error fetching roles:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__ROLES__GET = Fetch__ROLES__GET;
const Fetch__ROLES_WITH_USERS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield role_1.Role.find().populate("permissions").exec();
        const users = yield user_1.User.find().populate("roles").exec();
        const all = [];
        roles.forEach((role) => {
            const countUsers = users.filter((user) => user.roles.some((rol) => rol.name === role.name)).length;
            all.push({ role: role, countUsers });
        });
        return res.json({ status: "success", data: all });
    }
    catch (error) {
        console.error("Error fetching roles:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__ROLES_WITH_USERS__GET = Fetch__ROLES_WITH_USERS__GET;
const Create__ROLES__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, permissions } = req.body;
    try {
        const pe = yield permission_1.Permission.find();
        let newRolePerms = [];
        pe.forEach((p) => {
            if (permissions[p._id] && permissions[p._id].state) {
                newRolePerms.push(p._id);
            }
        });
        console.log(newRolePerms);
        const role = new role_1.Role({ name, permissions: newRolePerms });
        yield role.save();
        return res.status(201).json({ message: "Role created successfully" });
    }
    catch (error) {
        console.error("Error creating role:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Create__ROLES__POST = Create__ROLES__POST;
const Update__ROLES__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, name, status } = req.body;
    try {
        const pe = yield permission_1.Permission.find();
        const Trole = yield role_1.Role.findById(_id);
        let newRolePerms = [];
        pe.forEach((p) => {
            if (status[p._id] && status[p._id].state) {
                newRolePerms.push(p._id);
            }
        });
        Trole.name = name;
        Trole.permissions = newRolePerms;
        yield Trole.save();
        return res.status(201).json({ message: "Role Updated successfully" });
    }
    catch (error) {
        console.error("Error creating role:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Update__ROLES__PUT = Update__ROLES__PUT;
//# sourceMappingURL=Role-Controller.js.map