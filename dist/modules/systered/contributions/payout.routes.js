"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payout_controller_1 = require("./payout.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new payout_controller_1.PayoutController();
// Todas protegidas con token
router.get("/findAll", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/findOne/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.post("/create", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/update/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/remove/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.remove.bind(controller)));
exports.default = router;
//# sourceMappingURL=payout.routes.js.map