"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shortener_controller_1 = require("../controller/shortener.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new shortener_controller_1.ShortenerController();
router.get("/redirect/:code", (0, asyncHandler_1.asyncHandler)(controller.redirect.bind(controller)));
router.post("/create", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.get("/getAll", (0, auth_middleware_1.requireRole)(auth_middleware_1.userRol), (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/getAllForBackup", (0, auth_middleware_1.requireRole)(auth_middleware_1.userRol), (0, asyncHandler_1.asyncHandler)(controller.getAllForBackup.bind(controller)));
router.get("/getAllFilter", (0, auth_middleware_1.requireRole)(auth_middleware_1.userRol), (0, asyncHandler_1.asyncHandler)(controller.getAllFilter.bind(controller)));
router.patch("/update/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.get("/getById/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.getById.bind(controller)));
router.delete("/delete/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
exports.default = router;
//# sourceMappingURL=shortener.routes.js.map