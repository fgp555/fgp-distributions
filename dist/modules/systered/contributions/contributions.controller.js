"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionsController = void 0;
const contributions_service_1 = require("./contributions.service");
const service = new contributions_service_1.ContributionsService();
class ContributionsController {
    async findAll(req, res, next) {
        try {
            const data = await service.findAll();
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    }
    async findOne(req, res, next) {
        try {
            const data = await service.findOne(Number(req.params.id));
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const created = await service.create(req.body);
            res.status(201).json(created);
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const updated = await service.update(Number(req.params.id), req.body);
            res.json(updated);
        }
        catch (err) {
            next(err);
        }
    }
    async remove(req, res, next) {
        try {
            await service.remove(Number(req.params.id));
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ContributionsController = ContributionsController;
//# sourceMappingURL=contributions.controller.js.map