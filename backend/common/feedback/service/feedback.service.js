"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackSQLService = void 0;
// src\common\feedback\service\feedback.service.ts
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const feedback_entity_1 = require("../entities/feedback.entity");
class FeedbackSQLService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(feedback_entity_1.FeedbackEntity);
    }
    async getAll(query) {
        const { dateFrom, dateTo, sortDate = "DESC", search = "", limit = 10, page = 1 } = query;
        const qb = this.repo.createQueryBuilder("feedback");
        if (dateFrom && dateTo) {
            qb.andWhere("feedback.createdAt BETWEEN :dateFrom AND :dateTo", { dateFrom, dateTo });
        }
        if (search) {
            qb.andWhere("(feedback.title LIKE :search OR feedback.message LIKE :search)", {
                search: `%${search}%`,
            });
        }
        qb.orderBy("feedback.createdAt", sortDate.toUpperCase() === "ASC" ? "ASC" : "DESC");
        const take = Number(limit) || 10;
        const skip = (Number(page) - 1) * take;
        qb.skip(skip).take(take);
        const [results, totalItems] = await qb.getManyAndCount();
        const totalPages = Math.ceil(totalItems / take);
        const hasMore = page < totalPages;
        return {
            success: true,
            pagination: {
                page: Number(page),
                totalPages,
                hasMore,
                limit: take,
            },
            totalItems,
            results,
        };
    }
    async getById(id) {
        return await this.repo.findOneBy({ id });
    }
    async create(dto) {
        const feedback = this.repo.create(dto);
        return await this.repo.save(feedback);
    }
    async update(id, dto) {
        const feedback = await this.repo.findOneBy({ id });
        if (!feedback)
            return null;
        Object.assign(feedback, dto);
        return await this.repo.save(feedback);
    }
    async delete(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
    async getByEmail(userEmail) {
        // devuelve todos los feedbacks de ese email
        return await this.repo.find({
            where: { userEmail },
            order: { createdAt: "DESC" },
        });
    }
}
exports.FeedbackSQLService = FeedbackSQLService;
//# sourceMappingURL=feedback.service.js.map