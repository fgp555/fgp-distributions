"use strict";
// src\modules\ivanagb\wardrobe\service\user.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeUserService = void 0;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const user_entity_1 = require("../entities/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class WardrobeUserService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(user_entity_1.WardrobeUserEntity);
    }
    async getAll(query) {
        const { dateFrom, dateTo, sortDate = "DESC", search = "", limit = 10, page = 1 } = query;
        const qb = this.repo.createQueryBuilder("user");
        // ✅ Filtro por fechas
        if (dateFrom && dateTo) {
            qb.andWhere("user.createdAt BETWEEN :dateFrom AND :dateTo", { dateFrom, dateTo });
        }
        // ✅ Búsqueda por nombre, email o username
        if (search) {
            qb.andWhere("(user.name LIKE :search OR user.email LIKE :search OR user.username LIKE :search)", {
                search: `%${search}%`,
            });
        }
        // ✅ Ordenar por fecha
        qb.orderBy("user.createdAt", sortDate.toUpperCase() === "ASC" ? "ASC" : "DESC");
        // ✅ Paginación
        const take = Number(limit) || 10;
        const skip = (Number(page) - 1) * take;
        qb.skip(skip).take(take);
        const [results, totalItems] = await qb.getManyAndCount();
        const totalPages = Math.ceil(totalItems / take);
        const hasMore = page < totalPages;
        return {
            success: true,
            pagination: { page: Number(page), totalPages, hasMore, limit: take },
            totalItems,
            results,
        };
    }
    async getByEmail(email) {
        return this.repo.findOne({
            where: { email },
            relations: ["items", "outfits"], // opcional si quieres incluir relaciones
        });
    }
    async getById(id) {
        return await this.repo.findOne({
            where: { _id: id },
            relations: ["items", "outfits"], // 👈 incluye relaciones
        });
    }
    async create(dto) {
        const hashedPassword = await bcryptjs_1.default.hash(dto.password, 10);
        const user = this.repo.create({ ...dto, password: hashedPassword });
        return await this.repo.save(user);
    }
    async update(id, dto) {
        const user = await this.repo.findOneBy({ _id: id });
        if (!user)
            return null;
        if (dto.password) {
            dto.password = await bcryptjs_1.default.hash(dto.password, 10);
        }
        Object.assign(user, dto);
        return await this.repo.save(user);
    }
    async delete(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
}
exports.WardrobeUserService = WardrobeUserService;
//# sourceMappingURL=user.service.js.map