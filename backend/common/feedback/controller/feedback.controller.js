"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackController = void 0;
const error_middleware_1 = require("../../../middleware/error.middleware");
const feedback_service_1 = require("../service/feedback.service");
const service = new feedback_service_1.FeedbackSQLService();
class FeedbackController {
    async getAll(req, res, next) {
        try {
            const feedbacks = await service.getAll(req.query);
            res.json(feedbacks);
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const feedback = await service.getById(Number(req.params.id));
            if (!feedback)
                throw new error_middleware_1.AppError("Feedback not found", 404);
            res.json(feedback);
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const feedback = await service.create(req.body);
            res.status(201).json(feedback);
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const feedback = await service.update(Number(req.params.id), req.body);
            if (!feedback)
                throw new error_middleware_1.AppError("Feedback not found", 404);
            res.json(feedback);
        }
        catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        try {
            const success = await service.delete(Number(req.params.id));
            if (!success)
                throw new error_middleware_1.AppError("Feedback not found", 404);
            res.json({ message: "Feedback deleted" });
        }
        catch (err) {
            next(err);
        }
    }
    async getByEmail(req, res, next) {
        try {
            const { email } = req.params;
            const feedbacks = await service.getByEmail(email);
            if (!feedbacks || feedbacks.length === 0)
                throw new error_middleware_1.AppError("No feedback found for this email", 404);
            res.json(feedbacks);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.FeedbackController = FeedbackController;
//# sourceMappingURL=feedback.controller.js.map