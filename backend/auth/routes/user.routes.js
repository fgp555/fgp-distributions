"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const auth_middleware_2 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new user_controller_1.UsersController();
// ✅ Proteger rutas con verifyToken
router.get("/getAll", (0, auth_middleware_2.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/getById/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.getById.bind(controller)));
router.post("/create", (0, auth_middleware_2.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/update/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/delete/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
exports.default = router;
//# sourceMappingURL=user.routes.js.map