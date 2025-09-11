"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = void 0;
const email_service_1 = require("./email.service");
const error_middleware_1 = require("../../middleware/error.middleware");
const service = new email_service_1.EmailService();
class EmailController {
    async submit(req, res, next) {
        try {
            await service.sendContactEmail(req.body);
            res.status(200).json({
                success: true,
                message: "¡Formulario enviado con éxito!",
            });
        }
        catch (error) {
            console.error("Error al enviar correo:", error);
            next(new error_middleware_1.AppError("Error al enviar el formulario", 500));
        }
    }
    async getAll(req, res, next) {
        try {
            // page y limit opcionales en query string ?page=1&limit=5
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5;
            const emails = await service.findAll(page, limit);
            res.json(emails);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const email = await service.getById(Number(req.params.id));
            if (!email)
                return next(new error_middleware_1.AppError("No encontrado", 404));
            res.status(200).json({
                success: true,
                results: email,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const email = await service.update(Number(req.params.id), req.body);
            res.status(200).json({
                success: true,
                message: "Actualizado correctamente",
                results: email,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            await service.remove(Number(req.params.id));
            res.status(200).json({
                success: true,
                message: "Eliminado correctamente",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.EmailController = EmailController;
//# sourceMappingURL=email.controller.js.map