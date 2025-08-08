"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedContributionUsers = seedContributionUsers;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const UserEntity_1 = require("../entities/UserEntity");
const roles_enum_1 = require("../../../../auth/enum/roles.enum");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function seedContributionUsers() {
    const userRepo = typeOrmConfig_1.AppDataSource.getRepository(UserEntity_1.ContributionUserEntity);
    // console.log("🌱 Iniciando seed de Contribution Users...");
    // Evitar duplicados si ya existen usuarios
    const existing = await userRepo.count();
    if (existing > 0) {
        console.log(`⚠️ Ya existen ${existing} usuarios, omitiendo seed.`);
        return;
    }
    const passwordHash = await bcryptjs_1.default.hash("password123", 10);
    const users = userRepo.create([
        {
            _id: "083d01ae-5f1b-44c7-802c-a3dbb1b78a89",
            username: "admin",
            name: "Admin",
            lastName: "Principal",
            email: "admin@example.com",
            whatsapp: "+573001112233",
            password: passwordHash,
            role: roles_enum_1.UserRoleEnum.SUPERADMIN,
            displayName: "Admin Principal",
        },
        {
            username: "juanperez",
            name: "Juan",
            lastName: "Pérez",
            email: "juan@example.com",
            whatsapp: "+573002223344",
            password: passwordHash,
            role: roles_enum_1.UserRoleEnum.USER,
            displayName: "Juan Pérez",
        },
        {
            username: "maria",
            name: "María",
            lastName: "Gómez",
            email: "maria@example.com",
            whatsapp: "+573003334455",
            password: passwordHash,
            role: roles_enum_1.UserRoleEnum.USER,
            displayName: "María Gómez",
        },
    ]);
    await userRepo.save(users);
    console.log("🌱 contributionUsersSeeder seed complete ✅");
}
//# sourceMappingURL=seedContributionUsers.js.map