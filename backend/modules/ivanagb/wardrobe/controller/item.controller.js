"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeItemController = void 0;
const error_middleware_1 = require("../../../../middleware/error.middleware");
const item_service_1 = require("../service/item.service");
const service = new item_service_1.WardrobeItemService();
class WardrobeItemController {
    async getAll(req, res, next) {
        try {
            const items = await service.getAll(req.query);
            res.json(items);
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const item = await service.getById(Number(req.params.id));
            if (!item)
                throw new error_middleware_1.AppError("Item not found", 404);
            res.json(item);
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            // 👇 si hay archivo, añadimos su ruta a req.body
            if (req.file) {
                req.body.image = `/uploads/${req.file.filename}`;
            }
            const item = await service.create(req.body);
            res.status(201).json(item);
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ status: "error", message: "Invalid ID" });
            }
            if (req.file) {
                req.body.image = `/uploads/${req.file.filename}`;
            }
            const item = await service.update(id, req.body);
            if (!item) {
                return res.status(404).json({ status: "error", message: "Item not found" });
            }
            res.status(200).json(item);
        }
        catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        try {
            const success = await service.delete(Number(req.params.id));
            if (!success)
                throw new error_middleware_1.AppError("Item not found", 404);
            res.json({ message: "Item deleted" });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.WardrobeItemController = WardrobeItemController;
//# sourceMappingURL=item.controller.js.map