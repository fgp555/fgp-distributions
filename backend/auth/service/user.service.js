"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSQLService = void 0;
const typeOrmConfig_1 = require("../../config/typeOrmConfig");
const switchModule_1 = require("../../config/switchModule");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsersSQLService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository((0, switchModule_1.selectUserEntity)());
    }
    async getAll(query) {
        const { dateFrom, dateTo, sortDate = "DESC", search = "", limit = 10, page = 1 } = query;
        const qb = this.repo.createQueryBuilder("user");
        // ✅ Filtro por fechas
        if (dateFrom && dateTo) {
            qb.andWhere("user.createdAt BETWEEN :dateFrom AND :dateTo", {
                dateFrom,
                dateTo,
            });
        }
        // ✅ Búsqueda (ejemplo: por nombre o email)
        if (search) {
            qb.andWhere("(user.name LIKE :search OR user.email LIKE :search)", { search: `%${search}%` });
        }
        // ✅ Orden por fecha
        qb.orderBy("user.createdAt", sortDate.toUpperCase() === "ASC" ? "ASC" : "DESC");
        // ✅ Paginación
        const take = Number(limit) || 10;
        const skip = (Number(page) - 1) * take;
        qb.skip(skip).take(take);
        // Ejecutar consulta
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
        return await this.repo.findOneBy({ _id: id });
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
        // Si se envía un nuevo password, lo encriptamos
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
exports.UsersSQLService = UsersSQLService;
//# sourceMappingURL=user.service.js.map