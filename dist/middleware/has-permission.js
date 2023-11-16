"use strict";
// import { AccessControlInstance } from "../services/access-control";
// import { NextFunction, Request, Response } from "express";
// import resolveUserRoles from "../_utils/resolveUserRoles";
// import { Permission } from "accesscontrol";
// import { Admin } from "mongodb";
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
exports.hasPermission = void 0;
const hasPermission = (action) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        try {
            // const roles = await Role.find({ _id: { $in: user.roles } })
            //   .populate("permissions")
            //   .exec();
            console.log(user.permissions);
            const hasPermission = user.permissions.all.includes(action);
            if (hasPermission) {
                return next();
            }
            return res.status(403).json({ message: "Permission denied" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.hasPermission = hasPermission;
//# sourceMappingURL=has-permission.js.map