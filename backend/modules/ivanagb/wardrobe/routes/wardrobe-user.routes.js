"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../../../../utils/asyncHandler");
const wardrobe_user_controller_1 = require("../controller/wardrobe-user.controller");
const router = (0, express_1.Router)();
const controller = new wardrobe_user_controller_1.WardrobeUserController();
router.get("/getAll", /* verifyToken, */ (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/getById/:id", /* verifyToken, */ (0, asyncHandler_1.asyncHandler)(controller.getById.bind(controller)));
router.post("/create", /* verifyToken, */ (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/update/:id", /* verifyToken, */ (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/delete/:id", /* verifyToken, */ (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
router.get("/getByUsername/:username", (0, asyncHandler_1.asyncHandler)(controller.findByUsername.bind(controller)));
exports.default = router;
//# sourceMappingURL=wardrobe-user.routes.js.map