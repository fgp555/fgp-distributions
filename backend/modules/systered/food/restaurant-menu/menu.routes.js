"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_controller_1 = require("./menu.controller");
const router = (0, express_1.Router)();
router.get("/getAll", menu_controller_1.MenuItemController.getAll);
router.get("/getOne/:id", menu_controller_1.MenuItemController.getOne);
router.post("/create", menu_controller_1.MenuItemController.create);
router.put("/update/:id", menu_controller_1.MenuItemController.update);
router.delete("/delete/:id", menu_controller_1.MenuItemController.delete);
exports.default = router;
//# sourceMappingURL=menu.routes.js.map