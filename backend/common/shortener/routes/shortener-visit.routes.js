"use strict";
// src/common/shortener/shortener-visit.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shortener_visit_controller_1 = require("../controller/shortener-visit.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new shortener_visit_controller_1.ShortenerVisitController();
router.get("/", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/:id", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.findByShortenerId.bind(controller)));
exports.default = router;
//# sourceMappingURL=shortener-visit.routes.js.map