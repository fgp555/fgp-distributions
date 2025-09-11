"use strict";
// src\modules\ivanagb\wardrobe\service\user.service.ts
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeUserService = void 0;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const item_entity_1 = require("../entities/item.entity");
const user_entity_1 = require("../entities/user.entity");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const envs_1 = require("../../../../config/envs");
class WardrobeUserService {
    constructor() {
        this.userRepo = typeOrmConfig_1.AppDataSource.getRepository(user_entity_1.WardrobeUserEntity);
        this.itemRepo = typeOrmConfig_1.AppDataSource.getRepository(item_entity_1.WardrobeItemEntity);
    }
    async getAll(query) {
        const { dateFrom, dateTo, sortDate = "DESC", search = "", limit = 10, page = 1 } = query;
        const qb = this.userRepo.createQueryBuilder("user");
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
        return this.userRepo.findOne({
            where: { email },
            relations: ["items", "outfits"], // opcional si quieres incluir relaciones
        });
    }
    async getById(id) {
        return await this.userRepo.findOne({
            where: { _id: id },
            relations: ["items", "outfits"], // 👈 incluye relaciones
        });
    }
    async create(dto) {
        const hashedPassword = await bcryptjs_1.default.hash(dto.password, 10);
        const user = this.userRepo.create({ ...dto, password: hashedPassword });
        return await this.userRepo.save(user);
    }
    async update(id, dto) {
        const user = await this.userRepo.findOneBy({ _id: id });
        if (!user)
            return null;
        if (dto.password) {
            dto.password = await bcryptjs_1.default.hash(dto.password, 10);
        }
        Object.assign(user, dto);
        return await this.userRepo.save(user);
    }
    async delete(id) {
        // 1. Obtener items del usuario
        const items = await this.itemRepo.find({
            where: { user: { _id: id } },
        });
        // 2. Borrar archivos físicos (ajusta ruta según tu estructura)
        if (envs_1.DELETE_IMAGES_USERS) {
            for (const item of items) {
                if (item.image) {
                    const filePath = path.join(__dirname, "../../../../../", item.image);
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error("Error al borrar imagen:", err);
                        }
                    });
                }
            }
        }
        // 3. Borrar usuario (esto borrará en cascada outfits e items)
        const result = await this.userRepo.delete(id);
        return result.affected !== 0;
    }
    async updatePhoto(userId, photoPath) {
        const user = await this.userRepo.findOneBy({ _id: userId });
        if (!user)
            throw new Error("User not found");
        user.photo = photoPath;
        await this.userRepo.save(user);
        return user;
    }
}
exports.WardrobeUserService = WardrobeUserService;
//# sourceMappingURL=user.service.js.map