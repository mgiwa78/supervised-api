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
exports.verifyPasswordRequestTokenController = exports.passwordUpdateController = exports.forgotPasswordController = void 0;
const password_1 = require("../services/password");
const __CONSTANTS__1 = require("../__CONSTANTS__");
const user_1 = require("../models/user");
const sendResetPasswordMail_1 = __importDefault(require("../services/mail/sendResetPasswordMail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const forgotPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield user_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const resetToken = jsonwebtoken_1.default.sign({ email }, __CONSTANTS__1.JWT_SECRET, {
            expiresIn: "1h"
        });
        const mailResponse = yield (0, sendResetPasswordMail_1.default)(email, resetToken);
        res.json({ message: "Reset token sent to your email" });
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});
exports.forgotPasswordController = forgotPasswordController;
const passwordUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, token } = req.body;
        const decoded = jsonwebtoken_1.default.verify(token, __CONSTANTS__1.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({ status: "error", error: "Token Invalid" });
        }
        const user = yield user_1.User.findOne({ email: decoded.email });
        const hashedPassword = yield password_1.Password.toHash(password);
        user.password = hashedPassword;
        user.save();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "Password Updated Successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
});
exports.passwordUpdateController = passwordUpdateController;
const verifyPasswordRequestTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        console.log(token);
        if (!token) {
            return res.status(400).json({ status: "error", error: "Invalid Token" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, __CONSTANTS__1.JWT_SECRET);
        console.log(decoded);
        if (!decoded) {
            return res.status(400).json({ status: "error", error: "Token Invalid" });
        }
        return res.status(200).json({ status: "success", message: "Valid Token" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
});
exports.verifyPasswordRequestTokenController = verifyPasswordRequestTokenController;
//# sourceMappingURL=ForgotPassword-Controller.js.map