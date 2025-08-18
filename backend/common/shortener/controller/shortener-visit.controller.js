"use strict";
// src/common/shortener/shortener-visit.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerVisitController = void 0;
const shortener_visit_service_sql_1 = require("../service/shortener-visit.service.sql");
const error_middleware_1 = require("../../../middleware/error.middleware");
// const service = new ShortenerVisitMongoDBService();
const service = new shortener_visit_service_sql_1.ShortenerVisitSQLService();
class ShortenerVisitController {
    async findByShortenerId(req, res, next) {
        try {
            const id = req.params.id;
            const visits = await service.findByShortenerId(id);
            res.json(visits);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message || "Error fetching visits", 400));
        }
    }
    async getAll(req, res, next) {
        try {
            const visits = await service.getAll();
            res.json(visits);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message || "Error fetching all visits", 400));
        }
    }
}
exports.ShortenerVisitController = ShortenerVisitController;
//# sourceMappingURL=shortener-visit.controller.js.map