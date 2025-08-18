"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const auth_middleware_2 = require("../../middleware/auth.middleware");
const user_role_controller_1 = __importDefault(require("../controller/user.role.controller"));
const router = (0, express_1.Router)();
const controller = new user_controller_1.UsersController();
// ✅ Proteger rutas con verifyToken
router.get("/getAll", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/getById/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.getById.bind(controller)));
router.post("/create", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/update/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/delete/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
// allRoles
router.get("/allRoles", auth_middleware_1.verifyToken, (0, auth_middleware_2.requireRole)(auth_middleware_1.userRol), (0, asyncHandler_1.asyncHandler)(user_role_controller_1.default.allRoles.bind(user_role_controller_1.default)));
// admin
router.get("/admin", auth_middleware_1.verifyToken, (0, auth_middleware_2.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(user_role_controller_1.default.admin.bind(user_role_controller_1.default)));
// superAdmin
router.get("/superAdmin", auth_middleware_1.verifyToken, (0, auth_middleware_2.requireRole)(auth_middleware_1.superRol), (0, asyncHandler_1.asyncHandler)(user_role_controller_1.default.superAdmin.bind(user_role_controller_1.default)));
exports.default = router;
//# sourceMappingURL=user.routes.js.map