"use strict";
// src/common/stat/stat.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatService = void 0;
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const stat_entity_1 = require("../entities/stat.entity");
class StatService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(stat_entity_1.StatEntity);
        this.truncate = (str, max) => (str && str.length > max ? str.substring(0, max) : str);
    }
    async track(data) {
        data.currentURL = this.truncate(data.currentURL, 200);
        data.referrerURL = this.truncate(data.referrerURL, 200);
        const stat = this.repo.create(data);
        return await this.repo.save(stat);
    }
    async getAll(options) {
        const { dateFrom, dateTo, sortDate, search, limit, page } = options;
        const qb = this.repo.createQueryBuilder("stat");
        // filtros por fecha
        if (dateFrom) {
            qb.andWhere("stat.createdAt >= :dateFrom", { dateFrom });
        }
        if (dateTo) {
            qb.andWhere("stat.createdAt <= :dateTo", { dateTo });
        }
        // búsqueda por algún campo (ejemplo: name o description)
        if (search) {
            qb.andWhere("(stat.name LIKE :search OR stat.description LIKE :search)", {
                search: `%${search}%`,
            });
        }
        // orden por fecha
        qb.orderBy("stat.createdAt", sortDate);
        // paginación
        qb.skip((page - 1) * limit).take(limit);
        const [results, totalItems] = await qb.getManyAndCount();
        return {
            success: true,
            pagination: {
                page,
                totalPages: Math.ceil(totalItems / limit),
                hasMore: page * limit < totalItems,
                limit,
            },
            totalItems,
            results,
        };
    }
    async getById(id) {
        return await this.repo.findOneBy({ id });
    }
    async delete(id) {
        return await this.repo.delete(id);
    }
}
exports.StatService = StatService;
//# sourceMappingURL=stat-track.service.js.map