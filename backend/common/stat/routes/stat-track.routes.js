"use strict";
// src/common/stat/stat.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stat_track_controller_1 = require("../controller/stat-track.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new stat_track_controller_1.StatController();
router.post("/track", (0, asyncHandler_1.asyncHandler)(controller.track.bind(controller)));
router.get("/getAll", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/ipapi_co_json", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.ipapi_co_json.bind(controller)));
router.get("/getById/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.getById.bind(controller)));
router.delete("/delete/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
exports.default = router;
//# sourceMappingURL=stat-track.routes.js.map