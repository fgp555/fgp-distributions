"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeItemService = void 0;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const item_entity_1 = require("../entities/item.entity");
const user_entity_1 = require("../entities/user.entity");
const category_entity_1 = require("../entities/category.entity");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
            description: dto.description,
            image: dto.image,
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
        // 1️⃣ Buscar item para obtener la imagen
        const item = await this.itemRepo.findOneBy({ id });
        if (!item)
            return false;
        // 2️⃣ Borrar archivo físico si existe
        if (item.image) {
            // si guardas la URL completa, extrae solo el path
            const filePath = path.join(__dirname, "../../../../../uploads", path.basename(item.image));
            try {
                if (fs.existsSync(filePath)) {
                    await fs.promises.unlink(filePath);
                    console.log("🗑️ Imagen eliminada:", filePath);
                }
            }
            catch (err) {
                console.error("⚠️ Error al eliminar imagen:", err);
            }
        }
        // 3️⃣ Eliminar registro en la DB
        const result = await this.itemRepo.delete(id);
        return result.affected !== 0;
    }
}
exports.WardrobeItemService = WardrobeItemService;
//# sourceMappingURL=item.service.js.map