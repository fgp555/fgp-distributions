"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutfitController = void 0;
const outfit_service_1 = require("../service/outfit.service");
class OutfitController {
    constructor() {
        this.service = new outfit_service_1.OutfitService();
    }
    async getAll(req, res) {
        const { page, limit, search, sortDate, dateFrom, dateTo } = req.query;
        const result = await this.service.getAll({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            search: search || "",
            sortDate: sortDate === "ASC" || sortDate === "DESC" ? sortDate : "DESC",
            dateFrom: dateFrom,
            dateTo: dateTo,
        });
        res.json(result);
    }
    async getById(req, res) {
        const id = parseInt(req.params.id);
        const data = await this.service.getById(id);
        res.json(data);
    }
    async create(req, res) {
        const data = await this.service.create(req.body);
        res.status(201).json(data);
    }
    async update(req, res) {
        const id = parseInt(req.params.id);
        const updated = await this.service.update(id, req.body);
        res.json(updated);
    }
    async delete(req, res) {
        const id = parseInt(req.params.id);
        await this.service.delete(id);
        res.json({ message: "Outfit eliminado correctamente" });
    }
}
exports.OutfitController = OutfitController;
//# sourceMappingURL=outfit.controller.js.map