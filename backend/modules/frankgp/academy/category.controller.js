"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
class CategoryController {
    constructor() {
        this.service = new category_service_1.CategoryService();
    }
    async create(req, res) {
        const category = await this.service.create(req.body);
        res.json(category);
    }
    async getAll(_req, res) {
        const categories = await this.service.getAll();
        res.json(categories);
    }
    async getById(req, res) {
        const id = parseInt(req.params.id);
        const category = await this.service.getById(id);
        if (!category)
            return res.status(404).json({ message: "Category not found" });
        res.json(category);
    }
    async findSlug(req, res) {
        const slug = req.params.slug;
        const category = await this.service.findSlug(slug);
        if (!category)
            return res.status(404).json({ message: "Category not found" });
        res.json(category);
    }
    async update(req, res) {
        const id = parseInt(req.params.id);
        const updated = await this.service.update(id, req.body);
        res.json(updated);
    }
    async delete(req, res) {
        const id = parseInt(req.params.id);
        const result = await this.service.delete(id);
        res.json(result);
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map