"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessControlInstance = void 0;
const accesscontrol_1 = require("accesscontrol");
const grantsObjects = {
    Students: {
        organizations: {
            "read:own": ["*"],
            "update:own": ["*"],
            "delete:own": ["*"]
        },
        organizationUsers: {
            "read:any": ["*"],
            "update:any": ["*"],
            "delete:any": ["*"],
            "create:any": ["*"]
        },
        posts: {
            "read:own": ["*"],
            "update:own": ["*"],
            "delete:own": ["*"],
            "create:any": ["*"]
        },
        requests: {
            "create:any": ["*"]
        },
        users: {
            "read:own": ["*"],
            "update:own": ["*"],
            "delete:own": ["*"],
            "create:own": ["*"]
        },
        rooms: {
            "read:own": ["*"],
            "update:own": ["*"],
            "delete:own": ["*"],
            "create:own": ["*"]
        }
    },
    Lecturer: {
        organizations: {
            "create:own": ["*"],
            "read:any": ["*"],
            "update:own": ["*"],
            "delete:own": ["*"]
        },
        organizationAdmins: {
            "create:own": ["*"],
            "read:any": ["*"],
            "update:own": ["*"],
            "delete:own": ["*"]
        },
        organizationEditors: {
            "create:own": ["*"],
            "read:any": ["*"],
            "update:own": ["*"],
            "delete:own": ["*"]
        },
        posts: {
            "read:any": ["*"],
            "update:any": ["*"],
            "delete:any": ["*"],
            "create:any": ["*"]
        },
        requests: {
            "read:any": ["*"],
            "update:own": ["*"],
            "update:any": ["*"],
            "delete:own": ["*"],
            "create:any": ["*"]
        },
        users: {
            "read:own": ["*"],
            "update:own": ["*"],
            "delete:own": ["*"],
            "create:own": ["*"]
        }
    },
    Admin: {
        users: {
            "create:own": ["*"],
            "create:any": ["*"],
            "read:any": ["*"],
            "read:own": ["*"],
            "update:own": ["*"],
            "update:any": ["*"],
            "delete:own": ["*"],
            "delete:any": ["*"]
        }
    }
};
exports.AccessControlInstance = new accesscontrol_1.AccessControl(grantsObjects);
//# sourceMappingURL=access-control.js.map