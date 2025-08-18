"use strict";
// src\modules\ivanagb\wardrobe\routes\_wardrobe.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const category_routes_1 = __importDefault(require("./category.routes"));
const item_routes_1 = __importDefault(require("./item.routes"));
const outfit_routes_1 = __importDefault(require("./outfit.routes"));
const router = (0, express_1.Router)();
router.use("/wardrobe/user", user_routes_1.default);
router.use("/wardrobe/category", category_routes_1.default);
router.use("/wardrobe/item", item_routes_1.default);
router.use("/wardrobe/outfit", outfit_routes_1.default);
exports.default = router;
//# sourceMappingURL=_wardrobe.routes.js.map