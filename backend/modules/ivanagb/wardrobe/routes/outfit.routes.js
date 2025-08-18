"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../../../../utils/asyncHandler");
const auth_middleware_1 = require("../../../../middleware/auth.middleware");
const outfit_controller_1 = require("../controller/outfit.controller");
const router = (0, express_1.Router)();
const controller = new outfit_controller_1.OutfitController();
router.get("/getAll", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/getById/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.getById.bind(controller)));
router.post("/create", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/update/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/delete/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
exports.default = router;
//# sourceMappingURL=outfit.routes.js.map