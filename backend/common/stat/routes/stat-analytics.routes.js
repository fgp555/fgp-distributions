"use strict";
// src/common/stat/stat.analytics.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stat_analytics_controller_1 = require("../controller/stat-analytics.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new stat_analytics_controller_1.StatAnalyticsController();
router.get("/summary", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.summary.bind(controller)));
router.get("/by-date", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.byDate.bind(controller)));
router.get("/by-country", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.byCountry.bind(controller)));
router.get("/by-url", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.byURL.bind(controller)));
router.get("/by-affiliate", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.byAffiliate.bind(controller)));
exports.default = router;
//# sourceMappingURL=stat-analytics.routes.js.map