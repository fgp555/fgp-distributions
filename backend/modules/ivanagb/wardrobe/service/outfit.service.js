"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutfitService = void 0;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const pagination_1 = require("../../../../utils/pagination");
const outfit_entity_1 = require("../entities/outfit.entity");
class OutfitService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(outfit_entity_1.OutfitEntity);
    }
    // async getAll(options: {
    //   page: number;
    //   limit: number;
    //   search?: string;
    //   sortDate: "ASC" | "DESC";
    //   dateFrom?: string;
    //   dateTo?: string;
    // }) {
    //   const { page, limit, search, sortDate, dateFrom, dateTo } = options;
    //   const qb = this.repo
    //     .createQueryBuilder("outfit")
    //     .leftJoinAndSelect("outfit.tops", "tops")
    //     .leftJoinAndSelect("outfit.bottoms", "bottoms")
    //     .leftJoinAndSelect("outfit.accessories", "accessories");
    //   if (search) {
    //     qb.andWhere("LOWER(outfit.name) LIKE :search", {
    //       search: `%${search.toLowerCase()}%`,
    //     });
    //   }
    //   if (dateFrom) {
    //     qb.andWhere("outfit.date >= :dateFrom", { dateFrom });
    //   }
    //   if (dateTo) {
    //     qb.andWhere("outfit.date <= :dateTo", { dateTo });
    //   }
    //   qb.orderBy("outfit.date", sortDate);
    //   qb.skip((page - 1) * limit).take(limit);
    //   const [results, totalItems] = await qb.getManyAndCount();
    //   return {
    //     success: true,
    //     pagination: {
    //       page,
    //       totalPages: Math.ceil(totalItems / limit),
    //       hasMore: page * limit < totalItems,
    //       limit,
    //     },
    //     totalItems,
    //     results,
    //   };
    // }
    async getAll(options) {
        const qb = this.repo
            .createQueryBuilder("outfit")
            .leftJoinAndSelect("outfit.tops", "tops")
            .leftJoinAndSelect("outfit.bottoms", "bottoms")
            .leftJoinAndSelect("outfit.accessories", "accessories");
        return (0, pagination_1.paginateQuery)(qb, {
            page: options.page,
            limit: options.limit,
            search: options.search,
            searchField: "outfit.name",
            sortField: "outfit.date",
            sortOrder: options.sortDate,
            dateFrom: options.dateFrom,
            dateTo: options.dateTo,
            dateField: "outfit.date",
        });
    }
    async getById(id) {
        return this.repo.findOne({
            where: { id },
            relations: {
                tops: true,
                bottoms: true,
                accessories: true,
            },
        });
    }
    async create(data) {
        const { tops, bottoms, accessories, wardrobeId, ...outfitData } = data;
        const outfit = this.repo.create(outfitData);
        if (wardrobeId) {
            outfit.wardrobe = { id: wardrobeId }; // ⚠️ TypeORM acepta referencia por ID si lo casteas
        }
        const savedOutfit = await this.repo.save(outfit);
        if (tops?.length) {
            await this.repo.createQueryBuilder().relation(outfit_entity_1.OutfitEntity, "tops").of(savedOutfit).add(tops);
        }
        if (bottoms?.length) {
            await this.repo.createQueryBuilder().relation(outfit_entity_1.OutfitEntity, "bottoms").of(savedOutfit).add(bottoms);
        }
        if (accessories?.length) {
            await this.repo.createQueryBuilder().relation(outfit_entity_1.OutfitEntity, "accessories").of(savedOutfit).add(accessories);
        }
        return this.getById(savedOutfit.id);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.getById(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.OutfitService = OutfitService;
//# sourceMappingURL=outfit.service.js.map