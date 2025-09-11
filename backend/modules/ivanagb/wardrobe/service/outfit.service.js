"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeOutfitService = void 0;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const outfit_entity_1 = require("../entities/outfit.entity");
const user_entity_1 = require("../entities/user.entity");
const item_entity_1 = require("../entities/item.entity");
class WardrobeOutfitService {
    constructor() {
        this.outfitRepo = typeOrmConfig_1.AppDataSource.getRepository(outfit_entity_1.WardrobeOutfitEntity);
        this.userRepo = typeOrmConfig_1.AppDataSource.getRepository(user_entity_1.WardrobeUserEntity);
        this.itemRepo = typeOrmConfig_1.AppDataSource.getRepository(item_entity_1.WardrobeItemEntity);
    }
    async getAll(page = 1, limit = 10) {
        const [results, totalItems] = await this.outfitRepo.findAndCount({
            relations: ["items"], // añade "user" si lo necesitas
            skip: (page - 1) * limit,
            take: limit,
        });
        return { results, totalItems };
    }
    async getById(id) {
        return await this.outfitRepo.findOne({
            where: { id },
            relations: [/* "user", */ "items"],
        });
    }
    async create(data) {
        const user = await this.userRepo.findOne({ where: { _id: data.userId } });
        if (!user)
            throw new Error("Usuario no encontrado");
        const items = await this.itemRepo.findByIds(data.itemIds || []);
        const outfit = this.outfitRepo.create({
            name: data.name,
            description: data.description,
            user,
            items,
        });
        return await this.outfitRepo.save(outfit);
    }
    async update(id, data) {
        const outfit = await this.outfitRepo.findOne({ where: { id }, relations: ["items", "user"] });
        if (!outfit)
            throw new Error("Outfit no encontrado");
        if (data.userId) {
            const user = await this.userRepo.findOne({ where: { _id: data.userId } });
            if (!user)
                throw new Error("Usuario no encontrado");
            outfit.user = user;
        }
        if (data.itemIds) {
            const items = await this.itemRepo.findByIds(data.itemIds);
            outfit.items = items;
        }
        outfit.name = data.name ?? outfit.name;
        outfit.description = data.description ?? outfit.description;
        return await this.outfitRepo.save(outfit);
    }
    async delete(id) {
        const outfit = await this.outfitRepo.findOne({ where: { id } });
        if (!outfit)
            throw new Error("Outfit no encontrado");
        return await this.outfitRepo.remove(outfit);
    }
}
exports.WardrobeOutfitService = WardrobeOutfitService;
//# sourceMappingURL=outfit.service.js.map