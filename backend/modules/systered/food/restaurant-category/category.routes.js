"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
router.get("/getAll", category_controller_1.CategoryController.getAll);
router.get("/getById/:id", category_controller_1.CategoryController.getById);
router.post("/create", category_controller_1.CategoryController.create);
router.put("/update/:id", category_controller_1.CategoryController.update);
router.delete("/delete/:id", category_controller_1.CategoryController.delete);
exports.default = router;
//# sourceMappingURL=category.routes.js.map