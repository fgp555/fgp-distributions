"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersMongoDBService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("./models/user.model"));
class UsersMongoDBService {
    async findAll() {
        const results = await user_model_1.default.find();
        return {
            page: 1,
            totalPages: 1,
            totalItems: results.length,
            hasMore: false,
            results,
        };
    }
    async findOne(id) {
        return await user_model_1.default.findById(id);
    }
    async create(dto) {
        const hashedPassword = await bcryptjs_1.default.hash(dto.password, 10);
        const user = new user_model_1.default({ ...dto, password: hashedPassword });
        return await user.save();
    }
    async update(id, dto) {
        const user = await user_model_1.default.findById(id);
        if (!user)
            return null;
        if (dto.password) {
            dto.password = await bcryptjs_1.default.hash(dto.password, 10);
        }
        Object.assign(user, dto);
        return await user.save();
    }
    async remove(id) {
        const result = await user_model_1.default.deleteOne({ _id: id });
        return result.deletedCount !== 0;
    }
}
exports.UsersMongoDBService = UsersMongoDBService;
//# sourceMappingURL=user.mogodb.service.js.map