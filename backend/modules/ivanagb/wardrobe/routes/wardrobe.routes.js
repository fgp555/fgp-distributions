"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../../../../utils/asyncHandler");
const auth_middleware_1 = require("../../../../middleware/auth.middleware");
const wardrobe_controller_1 = require("../controller/wardrobe.controller");
const router = (0, express_1.Router)();
const controller = new wardrobe_controller_1.WardrobeController();
const superAdmin = ["superadmin"];
const admin = ["admin", "superadmin"];
const allRoles = ["user", "admin", "superadmin"];
router.get("/getAll", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/getById/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.getById.bind(controller)));
router.post("/create", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/update/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/delete/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
exports.default = router;
//# sourceMappingURL=wardrobe.routes.js.map