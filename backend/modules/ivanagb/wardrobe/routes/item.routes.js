"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/modules/ivanagb/wardrobe/routes/item.routes.ts
const express_1 = require("express");
const item_controller_1 = require("../controller/item.controller");
const asyncHandler_1 = require("../../../../utils/asyncHandler");
const auth_middleware_1 = require("../../../../middleware/auth.middleware");
const multer_1 = require("../../../../config/multer"); // 👈 importamos multer config
const router = (0, express_1.Router)();
const controller = new item_controller_1.WardrobeItemController();
// ✅ Rutas protegidas
router.get("/getAll", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/getById/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.getById.bind(controller)));
// ✅ Crear item con imagen
router.post("/create", auth_middleware_1.verifyToken, multer_1.upload.single("image"), // 👈 subir 1 archivo en el campo "image"
(0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
// ✅ Actualizar item con imagen opcional
router.patch("/update/:id", auth_middleware_1.verifyToken, multer_1.upload.single("image"), // 👈 subir 1 archivo en el campo "image"
(0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/delete/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
exports.default = router;
//# sourceMappingURL=item.routes.js.map