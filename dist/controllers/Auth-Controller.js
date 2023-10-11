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
exports.Fetch__USER_PROFILE__POST = exports.SignUp__AUTH__POST = exports.SignIn__AUTH__POST = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const password_1 = require("../services/password");
const __CONSTANTS__1 = require("../__CONSTANTS__");
const role_1 = require("../models/role");
const SignIn__AUTH__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.User.find({ email: email })
            .populate("department")
            .exec();
        if (user.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const verifyPassword = yield password_1.Password.compare(user[0].password, password);
        if (verifyPassword) {
            const roles = yield role_1.Role.find({ _id: { $in: user[0].roles } });
            const department = yield user_1.Department.findOne({ _id: user[0].department });
            const userData = {
                _id: user[0]._id,
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                email: user[0].email,
                department: department,
                roles: roles
            };
            const token = jsonwebtoken_1.default.sign({ user: userData }, __CONSTANTS__1.JWT_SECRET, {
                expiresIn: "9h"
            });
            return res.status(200).json({
                userAuth: userData,
                userJwt: token
            });
        }
        return res.status(400).json({ message: "Invalid user credentials" });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
});
exports.SignIn__AUTH__POST = SignIn__AUTH__POST;
const SignUp__AUTH__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstName, lastName, roles } = req.body;
        const existingUser = yield user_1.User.findOne({ email: email });
        if (existingUser) {
            return res.status(401).json({ error: "Email Already in use" });
        }
        const hashedPassword = yield password_1.Password.toHash(password);
        const user = yield user_1.User.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            roles: roles
        });
        const userData = Object.assign(Object.assign({}, user.toObject()), { password: null });
        const token = jsonwebtoken_1.default.sign({ user: userData }, __CONSTANTS__1.JWT_SECRET);
        const decoded = jsonwebtoken_1.default.verify(token, __CONSTANTS__1.JWT_SECRET);
        console.log(token);
        console.log("decoded:", decoded);
        res.json({
            status: "success",
            data: { userAuth: userData, userJwt: token }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
});
exports.SignUp__AUTH__POST = SignUp__AUTH__POST;
const Fetch__USER_PROFILE__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.user;
        const user = yield user_1.User.findById(userData === null || userData === void 0 ? void 0 : userData.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
});
exports.Fetch__USER_PROFILE__POST = Fetch__USER_PROFILE__POST;
//# sourceMappingURL=Auth-Controller.js.map