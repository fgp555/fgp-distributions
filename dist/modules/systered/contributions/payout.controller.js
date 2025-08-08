"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutController = void 0;
const payout_service_1 = require("./payout.service");
const service = new payout_service_1.PayoutService();
class PayoutController {
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
exports.PayoutController = PayoutController;
//# sourceMappingURL=payout.controller.js.map