"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/common/visit/visit.routes.ts
const express_1 = require("express");
const visit_controller_1 = require("./visit.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new visit_controller_1.VisitController();
router.get("/getAll", (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/getAllMock", (0, asyncHandler_1.asyncHandler)(controller.getAllMock.bind(controller)));
exports.default = router;
//# sourceMappingURL=visit.routes.js.map