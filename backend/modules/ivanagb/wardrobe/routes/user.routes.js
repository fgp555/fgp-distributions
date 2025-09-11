"use strict";
// src\modules\ivanagb\wardrobe\routes\user.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const asyncHandler_1 = require("../../../../utils/asyncHandler");
const auth_middleware_1 = require("../../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new user_controller_1.WardrobeUserController();
// ✅ Rutas protegidas
router.get("/me", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.me.bind(controller)));
router.get("/getAll", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/getById/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.getById.bind(controller)));
router.post("/create", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/update/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/delete/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
exports.default = router;
//# sourceMappingURL=user.routes.js.map