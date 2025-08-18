"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
class CategoryController {
    static async getAll(req, res) {
        const categories = await category_service_1.CategoryService.getAll();
        res.json(categories);
    }
    static async getById(req, res) {
        const category = await category_service_1.CategoryService.getById(Number(req.params.id));
        if (!category) {
            res.status(404).json({ message: "Not Found" });
            return;
        }
        res.json(category);
    }
    static async create(req, res) {
        const result = await category_service_1.CategoryService.create(req.body);
        res.status(201).json(result);
    }
    static async update(req, res) {
        const result = await category_service_1.CategoryService.update(Number(req.params.id), req.body);
        if (!result) {
            res.status(404).json({ message: "Not Found" });
            return;
        }
        res.json(result);
    }
    static async delete(req, res) {
        const success = await category_service_1.CategoryService.delete(Number(req.params.id));
        res.json({ deleted: success });
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map