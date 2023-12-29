"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_Controller_1 = require("../controllers/User-Controller");
const require_auth_1 = require("../middleware/require-auth");
const has_permission_1 = require("../middleware/has-permission");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post("/", [
    (0, express_validator_1.body)("firstName").notEmpty().withMessage("First name is required"),
    (0, express_validator_1.body)("lastName").notEmpty().withMessage("Last name is required"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Invalid email")
        .notEmpty()
        .withMessage("Email is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    (0, express_validator_1.body)("department").notEmpty().withMessage("Department is required"),
    (0, express_validator_1.body)("roles")
        .isArray({ min: 1 })
        .withMessage("At least one role is required")
], 
// AuthenticateUser,
// hasPermission("post"),
User_Controller_1.Create__USER__POST);
router.get("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("getAllUsers"), User_Controller_1.Fetch__USERS__GET);
router.get("/supervisors", require_auth_1.AuthenticateUser, 
// hasPermission("getAllUsers"),
User_Controller_1.Fetch__SUPERVISORS__GET);
router.get("/students", require_auth_1.AuthenticateUser, 
// hasPermission("getAllUsers"),
User_Controller_1.Fetch__STUDENTS__GET);
router.get("/:userId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("getAllUsers"), User_Controller_1.Fetch__USER__GET);
router.put("/:userId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("updateUsers"), User_Controller_1.Update__USER__PUT);
router.put("/myProfile/update", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("updateOwnProfile"), User_Controller_1.Update__OWN_USER__PUT);
router.get("/myProfile/view", require_auth_1.AuthenticateUser, 
// hasPermission("put"),
User_Controller_1.Fetch__MY_PROFILE__GET);
router.delete("/:id", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("delete"), User_Controller_1.Delete__USER__DELETE);
exports.default = router;
//# sourceMappingURL=usersRouter.js.map