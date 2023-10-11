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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __CONSTANTS__1 = require("../__CONSTANTS__");
const models_1 = require("../models");
const permission_1 = require("../models/permission");
const role_1 = require("../models/role");
const AuthenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        return res
            .status(401)
            .json({ status: "error", error: "No token provided" });
    }
    const decoded = jsonwebtoken_1.default.verify(token.replace("Bearer ", ""), __CONSTANTS__1.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({ status: "error", error: "Invalid Token" });
    }
    try {
        const userData = yield models_1.User.findById(decoded.user._id)
            .populate("roles")
            .populate({
            path: "roles",
            populate: {
                path: "permissions"
            }
        });
        let perms = [];
        const userRoles = yield role_1.Role.find({
            _id: { $in: userData.roles }
        }).populate("permissions");
        const permissions = [];
        const permissionPromises = userRoles.map((role) => __awaiter(void 0, void 0, void 0, function* () {
            const userPerms = yield permission_1.Permission.find({
                _id: { $in: role.permissions }
            });
            userPerms.forEach((perms) => permissions.push(perms.route));
        }));
        yield Promise.all(permissionPromises);
        console.log(permissions);
        // userData.roles.forEach((e) =>
        //   e.permissions.forEach((e) => {
        //     permissions.push(e.route);
        //   })
        // );
        // const perms = await Permissions.find();
        if (userData) {
            req.user = Object.assign({ id: decoded.user._id, roles: userData.roles.map((e) => e.name), permissions }, userData);
        }
        else {
            return res.status(401).json({ status: "error", error: "User Not Found" });
        }
        next();
    }
    catch (error) {
        console.error("Error verifying JWT token:", error);
        return res
            .status(401)
            .json({ status: "error", error: "Forbidden: invalid token" });
    }
});
exports.AuthenticateUser = AuthenticateUser;
//# sourceMappingURL=require-auth.js.map