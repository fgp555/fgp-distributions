"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeUserService = void 0;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const pagination_1 = require("../../../../utils/pagination");
const wardrobe_user_entity_1 = require("../entities/wardrobe-user.entity");
class WardrobeUserService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(wardrobe_user_entity_1.WardrobeUserEntity);
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
    //   const qb = this.repo.createQueryBuilder("user");
    //   if (search) {
    //     qb.andWhere("LOWER(user.name) LIKE :search", {
    //       search: `%${search.toLowerCase()}%`,
    //     });
    //   }
    //   if (dateFrom) {
    //     qb.andWhere("user.createdAt >= :dateFrom", { dateFrom });
    //   }
    //   if (dateTo) {
    //     qb.andWhere("user.createdAt <= :dateTo", { dateTo });
    //   }
    //   qb.orderBy("user.createdAt", sortDate);
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
        const qb = this.repo.createQueryBuilder("user");
        return (0, pagination_1.paginateQuery)(qb, {
            page: options.page,
            limit: options.limit,
            search: options.search,
            searchField: "user.name",
            sortField: "user.createdAt",
            sortOrder: options.sortDate,
            dateFrom: options.dateFrom,
            dateTo: options.dateTo,
            dateField: "user.createdAt",
        });
    }
    getById(id) {
        return this.repo.findOne({ where: { _id: id } });
    }
    create(data) {
        const user = this.repo.create(data);
        return this.repo.save(user);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.getById(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
    async findByUsername(username) {
        return this.repo.findOne({ where: { username } });
    }
}
exports.WardrobeUserService = WardrobeUserService;
//# sourceMappingURL=wardrobe-user.service.js.map