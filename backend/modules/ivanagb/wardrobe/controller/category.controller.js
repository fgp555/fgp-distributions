"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeCategoryController = void 0;
const error_middleware_1 = require("../../../../middleware/error.middleware");
const category_service_1 = require("../service/category.service");
const service = new category_service_1.WardrobeCategoryService();
class WardrobeCategoryController {
    async getAll(req, res, next) {
        try {
            const categories = await service.getAll(req.query);
            res.json(categories);
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const category = await service.getById(Number(req.params.id));
            if (!category)
                throw new error_middleware_1.AppError("Category not found", 404);
            res.json(category);
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const category = await service.create(req.body);
            res.status(201).json(category);
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const category = await service.update(Number(req.params.id), req.body);
            if (!category)
                throw new error_middleware_1.AppError("Category not found", 404);
            res.json(category);
        }
        catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        try {
            const success = await service.delete(Number(req.params.id));
            if (!success)
                throw new error_middleware_1.AppError("Category not found", 404);
            res.json({ message: "Category deleted" });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.WardrobeCategoryController = WardrobeCategoryController;
//# sourceMappingURL=category.controller.js.map