"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeItemService = void 0;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const item_entity_1 = require("../entities/item.entity");
const user_entity_1 = require("../entities/user.entity");
const category_entity_1 = require("../entities/category.entity");
class WardrobeItemService {
    constructor() {
        this.itemRepo = typeOrmConfig_1.AppDataSource.getRepository(item_entity_1.WardrobeItemEntity);
        this.userRepo = typeOrmConfig_1.AppDataSource.getRepository(user_entity_1.WardrobeUserEntity);
        this.categoryRepo = typeOrmConfig_1.AppDataSource.getRepository(category_entity_1.WardrobeCategoryEntity);
    }
    async getAll(query) {
        const { search = "", color, size, userId, categoryId, limit = 10, page = 1 } = query;
        const qb = this.itemRepo
            .createQueryBuilder("item")
            .leftJoinAndSelect("item.user", "user")
            .leftJoinAndSelect("item.category", "category");
        if (search) {
            qb.andWhere("item.name LIKE :search OR item.brand LIKE :search", { search: `%${search}%` });
        }
        if (color)
            qb.andWhere("item.color = :color", { color });
        if (size)
            qb.andWhere("item.size = :size", { size });
        if (userId)
            qb.andWhere("user._id = :userId", { userId });
        if (categoryId)
            qb.andWhere("category.id = :categoryId", { categoryId });
        const take = Number(limit) || 10;
        const skip = (Number(page) - 1) * take;
        qb.skip(skip).take(take).orderBy("item.id", "DESC");
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
        return await this.itemRepo.findOne({
            where: { id },
            relations: ["user", "category"],
        });
    }
    async create(dto) {
        // ✅ Verificar existencia de usuario
        let user = null;
        if (dto.userId) {
            user = await this.userRepo.findOneBy({ _id: dto.userId });
            if (!user)
                throw new Error(`User with id ${dto.userId} not found`);
        }
        // ✅ Verificar existencia de categoría
        let category = null;
        if (dto.categoryId) {
            category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
            if (!category)
                throw new Error(`Category with id ${dto.categoryId} not found`);
        }
        const item = this.itemRepo.create({
            name: dto.name,
            size: dto.size,
            color: dto.color,
            brand: dto.brand,
            imageUrl: dto.imageUrl,
            user,
            category,
        });
        return await this.itemRepo.save(item);
    }
    async update(id, dto) {
        const item = await this.itemRepo.findOneBy({ id });
        if (!item)
            return null;
        if (dto.userId) {
            const user = await this.userRepo.findOneBy({ _id: dto.userId });
            if (!user)
                throw new Error(`User with id ${dto.userId} not found`);
            item.user = user;
        }
        if (dto.categoryId) {
            const category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
            if (!category)
                throw new Error(`Category with id ${dto.categoryId} not found`);
            item.category = category;
        }
        Object.assign(item, dto);
        return await this.itemRepo.save(item);
    }
    async delete(id) {
        const result = await this.itemRepo.delete(id);
        return result.affected !== 0;
    }
}
exports.WardrobeItemService = WardrobeItemService;
//# sourceMappingURL=item.service.js.map