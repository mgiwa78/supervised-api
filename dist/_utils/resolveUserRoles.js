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
const user_1 = require("../models/user");
const mongodb_1 = require("mongodb");
const resolveUserRoles = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const UserID = new mongodb_1.ObjectId(id);
    const userWithRole = yield user_1.User.findOne({ _id: UserID });
    console.log(userWithRole);
    return userWithRole === null || userWithRole === void 0 ? void 0 : userWithRole.roles;
});
exports.default = resolveUserRoles;
//# sourceMappingURL=resolveUserRoles.js.map