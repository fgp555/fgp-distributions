"use strict";
// src\modules\ivanagb\wardrobe\controller\user.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeUserController = void 0;
const error_middleware_1 = require("../../../../middleware/error.middleware");
const user_service_1 = require("../service/user.service");
const service = new user_service_1.WardrobeUserService();
class WardrobeUserController {
    async getAll(req, res, next) {
        try {
            const users = await service.getAll(req.query);
            res.json(users);
        }
        catch (err) {
            next(err);
        }
    }
    async me(req, res, next) {
        try {
            const { user } = req; // viene del verifyToken
            if (!user || !user.email)
                throw new error_middleware_1.AppError("Unauthorized", 401);
            // buscamos en la DB por email (igual que AuthController)
            const dbUser = await service.getByEmail(user.email);
            if (!dbUser)
                throw new error_middleware_1.AppError("Wardrobe User not found", 404);
            // opcionalmente quitar password antes de enviar
            const { password, ...safeUser } = dbUser;
            res.json({
                success: true,
                user: safeUser,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const user = await service.getById(req.params.id);
            if (!user)
                throw new error_middleware_1.AppError("Wardrobe User not found", 404);
            res.json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const user = await service.create(req.body);
            res.status(201).json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const user = await service.update(req.params.id, req.body);
            if (!user)
                throw new error_middleware_1.AppError("Wardrobe User not found", 404);
            res.json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        try {
            const success = await service.delete(req.params.id);
            if (!success)
                throw new error_middleware_1.AppError("Wardrobe User not found", 404);
            res.json({ message: "Wardrobe User deleted" });
        }
        catch (err) {
            next(err);
        }
    }
    async updatePhoto(req, res, next) {
        try {
            const { id } = req.params;
            const file = req.file;
            const { username } = req.body;
            if (!file)
                throw new error_middleware_1.AppError("No file uploaded", 400);
            const updatedUser = await service.updatePhoto(id, `/uploads/${file.filename}`);
            res.json({ success: true, user: updatedUser });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.WardrobeUserController = WardrobeUserController;
//# sourceMappingURL=user.controller.js.map