"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeUserController = void 0;
const wardrobe_user_service_1 = require("../service/wardrobe-user.service");
class WardrobeUserController {
    constructor(service = new wardrobe_user_service_1.WardrobeUserService()) {
        this.service = service;
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
        const id = req.params.id;
        const user = await this.service.getById(id);
        res.json(user);
    }
    async create(req, res) {
        const newUser = await this.service.create(req.body);
        res.status(201).json(newUser);
    }
    async update(req, res) {
        const id = req.params.id;
        const updatedUser = await this.service.update(id, req.body);
        res.json(updatedUser);
    }
    async delete(req, res) {
        const id = req.params.id;
        await this.service.delete(id);
        res.status(204).send();
    }
    async findByUsername(req, res) {
        const username = req.params.username;
        const user = await this.service.findByUsername(username);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
}
exports.WardrobeUserController = WardrobeUserController;
//# sourceMappingURL=wardrobe-user.controller.js.map