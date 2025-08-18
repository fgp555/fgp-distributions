"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeOutfitService = void 0;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const outfit_entity_1 = require("../entities/outfit.entity");
const user_entity_1 = require("../entities/user.entity");
const item_entity_1 = require("../entities/item.entity");
class WardrobeOutfitService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(outfit_entity_1.WardrobeOutfitEntity);
        this.userRepo = typeOrmConfig_1.AppDataSource.getRepository(user_entity_1.WardrobeUserEntity);
        this.itemRepo = typeOrmConfig_1.AppDataSource.getRepository(item_entity_1.WardrobeItemEntity);
    }
    async getAll() {
        return await this.repo.find({ relations: [/* "user",  */ "items"] });
    }
    async getById(id) {
        return await this.repo.findOne({
            where: { id },
            relations: [/* "user", */ "items"],
        });
    }
    async create(data) {
        const user = await this.userRepo.findOne({ where: { _id: data.userId } });
        if (!user)
            throw new Error("Usuario no encontrado");
        const items = await this.itemRepo.findByIds(data.itemIds || []);
        const outfit = this.repo.create({
            name: data.name,
            description: data.description,
            user,
            items,
        });
        return await this.repo.save(outfit);
    }
    async update(id, data) {
        const outfit = await this.repo.findOne({ where: { id }, relations: ["items", "user"] });
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
        return await this.repo.save(outfit);
    }
    async delete(id) {
        const outfit = await this.repo.findOne({ where: { id } });
        if (!outfit)
            throw new Error("Outfit no encontrado");
        return await this.repo.remove(outfit);
    }
}
exports.WardrobeOutfitService = WardrobeOutfitService;
//# sourceMappingURL=outfit.service.js.map