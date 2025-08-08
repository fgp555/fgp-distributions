"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodController = void 0;
const period_service_1 = require("./period.service");
const service = new period_service_1.PeriodService();
class PeriodController {
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
            const { id } = req.params;
            const data = await service.findOne(Number(id));
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const data = await service.create(req.body);
            res.status(201).json(data);
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const data = await service.update(Number(id), req.body);
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    }
    async remove(req, res, next) {
        try {
            const { id } = req.params;
            await service.remove(Number(id));
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    }
}
exports.PeriodController = PeriodController;
//# sourceMappingURL=period.controller.js.map