"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUserSQL = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const typeOrmConfig_1 = require("../../config/typeOrmConfig");
const user_entity_1 = require("../entities/user.entity");
const hashedPass = async (password) => await bcryptjs_1.default.hash(password, 10);
// Datos base
const getUsers = async () => {
    const baseUsers = [
        {
            name: "User Tester",
            username: "user",
            email: "user@gmail.com",
            password: await hashedPass("user@gmail.com"),
            role: user_entity_1.UserRoleEnum.USER,
        },
        {
            name: "Admin Tester",
            email: "admin@gmail.com",
            username: "admin",
            password: await hashedPass("admin@gmail.com"),
            role: user_entity_1.UserRoleEnum.ADMIN,
        },
    ];
    const emailAdmin = process.env.SUPER_ADMIN_MAIL_SEED;
    const passAdmin = process.env.SUPER_ADMIN_PASS_SEED;
    if (emailAdmin && passAdmin) {
        // console.info("🔑 Admin credentials found in environment variables");
        baseUsers.push({
            name: "SUPERADMIN",
            username: "superadmin",
            email: emailAdmin,
            password: await hashedPass(passAdmin),
            role: user_entity_1.UserRoleEnum.SUPERADMIN,
            photo: "https://i.postimg.cc/GmddyvS1/icon-user.webp",
            sendMail: false,
            isVisible: true,
        });
    }
    return baseUsers;
};
// Seeder SQL
const seedUserSQL = async () => {
    try {
        const users = await getUsers();
        const userRepository = typeOrmConfig_1.AppDataSource.getRepository(user_entity_1.UserEntity);
        for (const user of users) {
            const exists = await userRepository.findOneBy({ email: user.email });
            if (!exists) {
                const newUser = userRepository.create(user);
                await userRepository.save(newUser);
            }
            else {
                console.info(`ℹ️ [SQL] Already exists: ${user.email}`);
            }
        }
        console.info("🌱 seedUserSQL seed complete ✅");
    }
    catch (error) {
        console.error("❌ [SQL] Error seeding users:", error);
    }
};
exports.seedUserSQL = seedUserSQL;
//# sourceMappingURL=user.seed.js.map