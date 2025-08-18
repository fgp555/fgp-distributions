"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerController = void 0;
const shortener_service_sql_1 = require("../service/shortener.service.sql");
const error_middleware_1 = require("../../../middleware/error.middleware");
// const service = new ShortenerMongoDBService();
const service = new shortener_service_sql_1.ShortenerSQLService();
class ShortenerController {
    async getAll(req, res, next) {
        try {
            const urls = await service.getAll();
            res.json(urls);
        }
        catch (err) {
            next(err);
        }
    }
    async getAllForBackup(req, res, next) {
        try {
            const urls = await service.getAllForBackup();
            res.json(urls);
        }
        catch (err) {
            next(err);
        }
    }
    async getAllFilter(req, res, next) {
        try {
            const { page, limit, search, dateFrom, dateTo, sortDate } = req.query;
            const result = await service.getAllFilter({
                page: Number(page),
                limit: Number(limit),
                search: search,
                dateFrom: dateFrom,
                dateTo: dateTo,
                sortDate: sortDate,
            });
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const { destination, backHalf } = req.body;
            const result = await service.create(destination, backHalf);
            res.status(201).json(result);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message || "Internal Error", 400));
        }
    }
    async redirect(req, res, next) {
        try {
            const { code } = req.params;
            const record = await service.findByCode(code);
            if (!record)
                return next(); // Si no existe, continúa a React u otro middleware
            // 👁️ Obtener datos del request
            const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress);
            const userAgent = req.headers["user-agent"] || "";
            const referrer = req.headers["referer"] || "";
            // Registrar la visita
            await service.registerVisit(record._id, { ip, userAgent, referrer });
            res.redirect(record.destination);
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const result = await service.getById(id);
            if (!result)
                throw new error_middleware_1.AppError("Short URL not found", 404);
            res.json(result);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const deleted = await service.delete(id);
            if (!deleted)
                throw new error_middleware_1.AppError("Short URL not found", 404);
            res.json({ message: "Short URL deleted" });
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
    async update(req, res, next) {
        try {
            const id = req.params.id;
            const { destination, backHalf } = req.body;
            const result = await service.update(id, { destination, backHalf });
            if (!result)
                throw new error_middleware_1.AppError("Short URL not found", 404);
            res.json(result);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
}
exports.ShortenerController = ShortenerController;
//# sourceMappingURL=shortener.controller.js.map