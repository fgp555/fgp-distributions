"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const user_mogodb_service_1 = require("./user.mogodb.service");
const user_sql_service_1 = require("./user.sql.service");
const envs_1 = require("../config/envs");
const service = envs_1.ENV_MONGO.USE_IN_AUTH ? new user_mogodb_service_1.UsersMongoDBService() : new user_sql_service_1.UsersSQLService();
class UsersController {
    async findAll(req, res, next) {
        try {
            const users = await service.findAll();
            res.json(users);
        }
        catch (err) {
            next(err);
        }
    }
    async findOne(req, res, next) {
        try {
            const user = await service.findOne(req.params.id);
            if (!user)
                throw new error_middleware_1.AppError("User not found", 404);
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
                throw new error_middleware_1.AppError("User not found", 404);
            res.json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async remove(req, res, next) {
        try {
            const success = await service.remove(req.params.id);
            if (!success)
                throw new error_middleware_1.AppError("User not found", 404);
            res.json({ message: "User deleted" });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=user.controller.js.map