"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/common/restaurant/restaurant.routes.ts
const express_1 = require("express");
const restaurant_controller_1 = require("./restaurant.controller");
const router = (0, express_1.Router)();
router.get("/getAll", restaurant_controller_1.RestaurantController.getAll);
router.get("/slug/:slug", restaurant_controller_1.RestaurantController.getBySlug);
router.get("/waiter/:slug", restaurant_controller_1.RestaurantController.getWaitersBySlug);
router.get("/categories/:slug", restaurant_controller_1.RestaurantController.getCategoriesBySlug);
router.get("/tables/:slug", restaurant_controller_1.RestaurantController.getTablesBySlug);
router.get("/getById/:id", restaurant_controller_1.RestaurantController.getById);
router.post("/create", restaurant_controller_1.RestaurantController.create);
router.put("/update/:id", restaurant_controller_1.RestaurantController.update);
router.delete("/delete/:id", restaurant_controller_1.RestaurantController.delete);
exports.default = router;
//# sourceMappingURL=restaurant.routes.js.map