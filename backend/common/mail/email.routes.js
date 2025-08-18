"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_controller_1 = require("./email.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new email_controller_1.EmailController();
router.post("/submit", (0, asyncHandler_1.asyncHandler)(controller.submit.bind(controller)));
router.post("/submit-token", (0, auth_middleware_1.requireRole)(auth_middleware_1.adminRol), (0, asyncHandler_1.asyncHandler)(controller.submit.bind(controller)));
exports.default = router;
//# sourceMappingURL=email.routes.js.map