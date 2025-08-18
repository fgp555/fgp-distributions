"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const options_controller_1 = require("./options.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new options_controller_1.OptionsController();
router.get("/getAll", (0, auth_middleware_1.requireRole)(auth_middleware_1.userRol), (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/getById/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.userRol), (0, asyncHandler_1.asyncHandler)(controller.getById.bind(controller)));
router.get("/getByKey/:key", (0, auth_middleware_1.requireRole)(auth_middleware_1.userRol), (0, asyncHandler_1.asyncHandler)(controller.findByKey.bind(controller)));
router.get("/getBootCount", (0, auth_middleware_1.requireRole)(auth_middleware_1.userRol), (0, asyncHandler_1.asyncHandler)(controller.getBootCount.bind(controller)));
router.post("/create", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/update/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/delete/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
exports.default = router;
//# sourceMappingURL=options.routes.js.map