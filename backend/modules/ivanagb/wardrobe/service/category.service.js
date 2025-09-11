"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeCategoryService = void 0;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const category_entity_1 = require("../entities/category.entity");
class WardrobeCategoryService {
    constructor() {
        this.categoryRepo = typeOrmConfig_1.AppDataSource.getRepository(category_entity_1.WardrobeCategoryEntity);
    }
    async getAll(query) {
        const { search = "", sortName = "ASC", limit = 10, page = 1 } = query;
        const qb = this.categoryRepo.createQueryBuilder("category");
        //.leftJoinAndSelect("category.items", "items");
        // ✅ Filtro por nombre
        if (search) {
            qb.where("category.name LIKE :search", { search: `%${search}%` });
        }
        // ✅ Ordenar por nombre
        qb.orderBy("category.id", sortName.toUpperCase() === "DESC" ? "DESC" : "ASC");
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
    async getById(id) {
        return await this.categoryRepo.findOne({
            where: { id },
            // relations: ["items"], // incluye items de la categoría
        });
    }
    async create(dto) {
        const category = this.categoryRepo.create(dto);
        return await this.categoryRepo.save(category);
    }
    async update(id, dto) {
        const category = await this.categoryRepo.findOneBy({ id });
        if (!category)
            return null;
        Object.assign(category, dto);
        return await this.categoryRepo.save(category);
    }
    async delete(id) {
        const result = await this.categoryRepo.delete(id);
        return result.affected !== 0;
    }
}
exports.WardrobeCategoryService = WardrobeCategoryService;
//# sourceMappingURL=category.service.js.map