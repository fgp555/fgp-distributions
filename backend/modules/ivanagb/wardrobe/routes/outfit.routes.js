"use strict";
// src\modules\ivanagb\wardrobe\routes\outfit.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const outfit_controller_1 = require("../controller/outfit.controller");
const auth_middleware_1 = require("../../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new outfit_controller_1.WardrobeOutfitController();
router.get("/getAll", auth_middleware_1.verifyToken, controller.getAll.bind(controller));
router.get("/getById/:id", auth_middleware_1.verifyToken, controller.getById.bind(controller));
router.post("/create", auth_middleware_1.verifyToken, controller.create.bind(controller));
router.patch("/update/:id", auth_middleware_1.verifyToken, controller.update.bind(controller));
router.delete("/delete/:id", auth_middleware_1.verifyToken, controller.delete.bind(controller));
exports.default = router;
//# sourceMappingURL=outfit.routes.js.map