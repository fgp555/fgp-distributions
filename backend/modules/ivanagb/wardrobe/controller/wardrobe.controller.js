"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeController = void 0;
const wardrobe_service_1 = require("../service/wardrobe.service");
class WardrobeController {
    constructor() {
        this.service = new wardrobe_service_1.WardrobeService();
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
        const { id } = req.params;
        const wardrobe = await this.service.getById(+id);
        res.json(wardrobe);
    }
    async create(req, res) {
        const data = req.body;
        const wardrobe = await this.service.create(data);
        res.status(201).json(wardrobe);
    }
    async update(req, res) {
        const { id } = req.params;
        const data = req.body;
        const updated = await this.service.update(+id, data);
        res.json(updated);
    }
    async delete(req, res) {
        const { id } = req.params;
        await this.service.delete(+id);
        res.status(204).send();
    }
}
exports.WardrobeController = WardrobeController;
//# sourceMappingURL=wardrobe.controller.js.map