"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerSQLService = void 0;
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const shortener_entity_1 = require("../entities/shortener.entity");
const nanoid_1 = require("nanoid");
const shortener_visit_entity_1 = require("../entities/shortener-visit.entity");
class ShortenerSQLService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(shortener_entity_1.ShortenerEntity);
        this.visitRepo = typeOrmConfig_1.AppDataSource.getRepository(shortener_visit_entity_1.ShortenerVisitEntity);
    }
    async getAll() {
        return await this.repo.find();
    }
    async getAllForBackup() {
        return await this.repo.find({
            select: ["backHalf", "destination"],
            order: { destination: "ASC" },
        });
    }
    async getAllFilter(params) {
        const { page, limit, search, dateFrom, dateTo, sortDate } = params;
        const query = this.repo.createQueryBuilder("shortener").leftJoinAndSelect("shortener.visits", "visit");
        // ✅ Filtro por búsqueda
        if (search) {
            query.andWhere("LOWER(shortener.backHalf) LIKE :search", {
                search: `%${search.toLowerCase()}%`,
            });
        }
        const [results] = await query.getManyAndCount();
        // ✅ Rango de fechas
        const fromDate = dateFrom ? new Date(dateFrom) : new Date("1970-01-01");
        const toDate = dateTo ? new Date(dateTo) : new Date();
        const filteredResults = results.map((shortener) => {
            let filteredVisits = shortener.visits ?? [];
            filteredVisits = filteredVisits.filter((v) => {
                const visitedAt = new Date(v.visitedAt);
                return visitedAt >= fromDate && visitedAt <= toDate;
            });
            return {
                ...shortener,
                visits: filteredVisits,
                visitCount: filteredVisits.length,
            };
        });
        // ✅ Ordenar por visitCount (fecha o métrica)
        if (sortDate === "ASC") {
            filteredResults.sort((a, b) => a.visitCount - b.visitCount);
        }
        else if (sortDate === "DESC") {
            filteredResults.sort((a, b) => b.visitCount - a.visitCount);
        }
        // ✅ Paginación
        const currentPage = page || 1;
        const take = limit || filteredResults.length;
        const skip = (currentPage - 1) * take;
        const paginatedResults = filteredResults.slice(skip, skip + take);
        const totalItems = filteredResults.length;
        const totalPages = Math.ceil(totalItems / take);
        const hasMore = currentPage < totalPages;
        return {
            success: true,
            pagination: {
                page: currentPage,
                totalPages,
                hasMore,
                limit: take,
            },
            totalItems,
            results: paginatedResults,
        };
    }
    async create(destination, backHalf) {
        const backHalfResult = backHalf || (0, nanoid_1.nanoid)(6);
        // Verificar si ya existe ese código
        const exists = await this.repo.findOneBy({ backHalf: backHalfResult });
        if (exists) {
            throw new Error("Short code already in use");
        }
        const short = this.repo.create({ backHalf: backHalfResult, destination });
        return await this.repo.save(short);
    }
    async findByCode(code) {
        return await this.repo.findOneBy({ backHalf: code });
    }
    async getById(id) {
        return await this.repo.findOneBy({ _id: id });
    }
    async delete(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
    async update(id, data) {
        const record = await this.repo.findOneBy({ _id: id });
        if (!record)
            return null;
        // Si el código personalizado cambia, verificar si ya existe
        if (data.backHalf && data.backHalf !== record.backHalf) {
            const exists = await this.repo.findOneBy({ backHalf: data.backHalf });
            if (exists)
                throw new Error("Custom code already in use");
            record.backHalf = data.backHalf;
        }
        if (data.destination) {
            record.destination = data.destination;
        }
        return await this.repo.save(record);
    }
    async registerVisit(shortenerId, data) {
        const visit = this.visitRepo.create({ ...data, shortenerId });
        return this.visitRepo.save(visit);
    }
}
exports.ShortenerSQLService = ShortenerSQLService;
//# sourceMappingURL=shortener.service.sql.js.map