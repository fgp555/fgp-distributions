"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_history_controller_1 = require("./payment-history.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new payment_history_controller_1.PaymentHistoryController();
// Todas protegidas por token
router.get("/findAll", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/findOne/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.post("/create", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/update/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/remove/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.remove.bind(controller)));
exports.default = router;
//# sourceMappingURL=payment-history.routes.js.map