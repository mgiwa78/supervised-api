"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_Controller_1 = require("../controllers/Auth-Controller");
const require_auth_1 = require("../middleware/require-auth");
const ForgotPassword_Controller_1 = require("../controllers/ForgotPassword-Controller");
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../middleware/validate-request");
const authRouter = express_1.default.Router();
authRouter.post("/signin", Auth_Controller_1.SignIn__AUTH__POST);
authRouter.post("/signup", [
    (0, express_validator_1.body)("firstName").notEmpty().withMessage("Firstname is required"),
    (0, express_validator_1.body)("lastName").notEmpty().withMessage("Lastname is required"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    (0, express_validator_1.body)("roles").notEmpty().withMessage("User roles is required")
], validate_request_1.ValidateRequest, Auth_Controller_1.SignUp__AUTH__POST);
authRouter.get("/me", require_auth_1.AuthenticateUser, Auth_Controller_1.Fetch__USER_PROFILE__POST);
authRouter.post("/forgotPassword", ForgotPassword_Controller_1.forgotPasswordController);
authRouter.post("/passwordUpdate", ForgotPassword_Controller_1.passwordUpdateController);
authRouter.post("/verifyPasswordRequestToken", ForgotPassword_Controller_1.verifyPasswordRequestTokenController);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map