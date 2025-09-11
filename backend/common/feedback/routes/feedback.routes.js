"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src\common\feedback\routes\feedback.routes.ts
const express_1 = require("express");
const feedback_controller_1 = require("../controller/feedback.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new feedback_controller_1.FeedbackController();
router.get("/getAll", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/getById/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.getById.bind(controller)));
router.get("/getByEmail/:email", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.getByEmail.bind(controller)));
router.post("/create", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/update/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/delete/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
exports.default = router;
//# sourceMappingURL=feedback.routes.js.map