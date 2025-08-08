"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentHistoryController = void 0;
const payment_history_service_1 = require("./payment-history.service");
const service = new payment_history_service_1.PaymentHistoryService();
class PaymentHistoryController {
    async findAll(req, res, next) {
        try {
            const results = await service.findAll();
            res.json(results);
        }
        catch (err) {
            next(err);
        }
    }
    async findOne(req, res, next) {
        try {
            const result = await service.findOne(parseInt(req.params.id, 10));
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const result = await service.create(req.body);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const result = await service.update(parseInt(req.params.id, 10), req.body);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async remove(req, res, next) {
        try {
            const success = await service.remove(parseInt(req.params.id, 10));
            res.json({ success });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.PaymentHistoryController = PaymentHistoryController;
//# sourceMappingURL=payment-history.controller.js.map