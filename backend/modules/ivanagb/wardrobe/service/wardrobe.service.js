"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeService = void 0;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const slugify_1 = require("../../../../utils/slugify");
const wardrobe_entity_1 = require("../entities/wardrobe.entity");
class WardrobeService {
    constructor() {
        this.wardrobeRepo = typeOrmConfig_1.AppDataSource.getRepository(wardrobe_entity_1.WardrobeEntity);
    }
    async getAll(options) {
        const { page, limit, search, sortDate, dateFrom, dateTo } = options;
        const qb = this.wardrobeRepo
            .createQueryBuilder("wardrobe")
            .leftJoinAndSelect("wardrobe.user", "user")
            .leftJoinAndSelect("wardrobe.tops", "tops")
            .leftJoinAndSelect("wardrobe.bottoms", "bottoms")
            .leftJoinAndSelect("wardrobe.accessories", "accessories")
            .leftJoinAndSelect("wardrobe.outfits", "outfits")
            .leftJoinAndSelect("outfits.tops", "outfitTops")
            .leftJoinAndSelect("outfits.bottoms", "outfitBottoms")
            .leftJoinAndSelect("outfits.accessories", "outfitAccessories");
        if (search) {
            qb.andWhere("LOWER(wardrobe.name) LIKE :search", {
                search: `%${search.toLowerCase()}%`,
            });
        }
        if (dateFrom) {
            qb.andWhere("wardrobe.createdAt >= :dateFrom", { dateFrom });
        }
        if (dateTo) {
            qb.andWhere("wardrobe.createdAt <= :dateTo", { dateTo });
        }
        qb.orderBy("wardrobe.createdAt", sortDate);
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
        return await this.wardrobeRepo.findOne({
            where: { id },
            relations: [
                "user",
                "tops",
                "bottoms",
                "accessories",
                "outfits",
                "outfits.tops",
                "outfits.bottoms",
                "outfits.accessories",
            ],
        });
    }
    async create(data) {
        if (data.name) {
            data.slug = (0, slugify_1.toSlug)(data.name);
        }
        const newWardrobe = this.wardrobeRepo.create(data);
        return await this.wardrobeRepo.save(newWardrobe);
    }
    async update(id, data) {
        await this.wardrobeRepo.update(id, data);
        return await this.getById(id);
    }
    async delete(id) {
        await this.wardrobeRepo.delete(id);
    }
}
exports.WardrobeService = WardrobeService;
//# sourceMappingURL=wardrobe.service.js.map