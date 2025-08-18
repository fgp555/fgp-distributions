"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeOutfitController = void 0;
const outfit_service_1 = require("../service/outfit.service");
class WardrobeOutfitController {
    constructor() {
        this.service = new outfit_service_1.WardrobeOutfitService();
        this.getAll = async (req, res) => {
            const data = await this.service.getAll();
            res.json(data);
        };
        this.getById = async (req, res) => {
            const id = parseInt(req.params.id);
            const data = await this.service.getById(id);
            res.json(data);
        };
        this.create = async (req, res) => {
            const data = await this.service.create(req.body);
            res.json(data);
        };
        this.update = async (req, res) => {
            const id = parseInt(req.params.id);
            const data = await this.service.update(id, req.body);
            res.json(data);
        };
        this.delete = async (req, res) => {
            const id = parseInt(req.params.id);
            const data = await this.service.delete(id);
            res.json(data);
        };
    }
}
exports.WardrobeOutfitController = WardrobeOutfitController;
//# sourceMappingURL=outfit.controller.js.map