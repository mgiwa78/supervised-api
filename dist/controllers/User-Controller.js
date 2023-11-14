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
exports.Delete__USER__DELETE = exports.Update__OWN_USER__PUT = exports.Create__USER__POST = exports.Update__USER__PUT = exports.Fetch__USER__GET = exports.Fetch__STUDENTS_FOR_DEPT____GET = exports.Fetch__STUDENTS__GET = exports.Fetch__SUPERVISORS_FOR_DEPT__GET = exports.Fetch__USERS__GET = exports.Fetch__ORGANIZATIONS_USERS__GET = void 0;
const user_1 = require("../models/user");
const password_1 = require("../services/password");
const role_1 = require("../models/role");
// Fetch users for an organization
const Fetch__ORGANIZATIONS_USERS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizationId = req.params.organizationId;
        const users = yield user_1.User.find({ organization: organizationId });
        return res.json({ status: "success", data: users });
    }
    catch (error) {
        console.error("Error fetching organization users:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__ORGANIZATIONS_USERS__GET = Fetch__ORGANIZATIONS_USERS__GET;
// Fetch all users for an admin
const Fetch__USERS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = [];
        const users = yield user_1.User.find()
            .populate("department")
            .populate("roles")
            .populate({
            path: "roles",
            populate: {
                path: "permissions"
            }
        });
        if (req.user.permissions.types["getAllUsers"]) {
            yield Promise.all(req.user.permissions.types["getAllUsers"].map((e) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(e.toString());
                const r = yield role_1.Role.findById(e);
                const us = yield user_1.User.find({
                    roles: { $in: e }
                })
                    .populate("department")
                    .populate("roles")
                    .populate({
                    path: "roles",
                    populate: {
                        path: "permissions"
                    }
                });
                console.log(us);
                allUsers.push(...us);
            })));
            return res.json({ status: "success", data: allUsers });
        }
        return res.json({ status: "success", data: users });
    }
    catch (error) {
        console.error("Error fetching all users:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__USERS__GET = Fetch__USERS__GET;
const Fetch__SUPERVISORS_FOR_DEPT__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        const supervisorRole = yield role_1.Role.findOne({ name: "Supervisor" });
        const supervisors = yield user_1.User.find({
            roles: { $in: [supervisorRole._id] },
            department: req.user.department
        })
            .populate("department")
            .populate("roles")
            .exec();
        return res.json({ status: "success", data: supervisors });
    }
    catch (error) {
        console.error("Error fetching all Supervisor:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__SUPERVISORS_FOR_DEPT__GET = Fetch__SUPERVISORS_FOR_DEPT__GET;
const Fetch__STUDENTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentRole = yield role_1.Role.findOne({ name: "Student" });
        const students = yield user_1.User.find({ roles: { $in: [studentRole._id] } })
            .populate("department")
            .populate("roles")
            .exec();
        return res.json({ status: "success", data: students });
    }
    catch (error) {
        console.error("Error fetching all students:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__STUDENTS__GET = Fetch__STUDENTS__GET;
const Fetch__STUDENTS_FOR_DEPT____GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { onDepartment } = req.query;
        console.log(onDepartment);
        const studentRole = yield role_1.Role.findOne({ name: "Student" });
        console.log(studentRole);
        const students = yield user_1.User.find(Object.assign({ roles: { $in: studentRole._id } }, (!onDepartment && { department: req.user.department })))
            .populate("department")
            .populate("roles")
            .exec();
        return res.json({ status: "success", data: students });
    }
    catch (error) {
        console.error("Error fetching all students:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__STUDENTS_FOR_DEPT____GET = Fetch__STUDENTS_FOR_DEPT____GET;
const Fetch__USER__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_1.User.findById(userId)
            .populate("department")
            .populate("roles")
            .exec();
        return res.json({ status: "success", data: user });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__USER__GET = Fetch__USER__GET;
// Update a user
const Update__USER__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { firstName, lastName, email, department, password } = req.body;
        const pas = password_1.Password.toHash(password);
        const user = yield user_1.User.findByIdAndUpdate(userId, { firstName, lastName, email, pas, department }, { new: true });
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }
        return res.json({ status: "success", data: user });
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Update__USER__PUT = Update__USER__PUT;
const Create__USER__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, department, password } = req.body;
        const roles = [];
        const ifuser = yield user_1.User.findOne({ email: email });
        if (req.body.rolesState) {
            const allRoles = yield role_1.Role.find();
            allRoles.forEach((r) => {
                if (req.body.rolesState[r._id] === true) {
                    roles.push(r._id);
                }
            });
        }
        if (ifuser) {
            return res
                .status(404)
                .json({ status: "error", error: "Email Already Exists" });
        }
        const hashedPassword = yield password_1.Password.toHash(password);
        const user = yield user_1.User.create({
            firstName,
            lastName,
            email,
            department,
            roles: [...roles],
            password: hashedPassword
        });
        return res.json({ status: "success", data: user });
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Create__USER__POST = Create__USER__POST;
const Update__OWN_USER__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Assuming user ID is available in the request object
        const { name, email, password } = req.body;
        const user = yield user_1.User.findByIdAndUpdate(userId, { name, email, password }, { new: true });
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }
        return res.json({ status: "success", data: user });
    }
    catch (error) {
        console.error("Error updating own profile:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Update__OWN_USER__PUT = Update__OWN_USER__PUT;
const Delete__USER__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_1.User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ status: "error", error: "user not found" });
        }
        return res.json({
            status: "success",
            message: "User deleted successfully"
        });
    }
    catch (error) {
        console.error("Error deleting User:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Delete__USER__DELETE = Delete__USER__DELETE;
//# sourceMappingURL=User-Controller.js.map