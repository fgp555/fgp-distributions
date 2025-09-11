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
exports.wardrobeSeeder = wardrobeSeeder;
// src/modules/ivanagb/wardrobe/seed/wardrobe.seeder.ts
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const user_entity_1 = require("../entities/user.entity");
const category_entity_1 = require("../entities/category.entity");
const item_entity_1 = require("../entities/item.entity");
const outfit_entity_1 = require("../entities/outfit.entity");
const bcrypt = __importStar(require("bcryptjs"));
async function wardrobeSeeder() {
    const dataSource = typeOrmConfig_1.AppDataSource;
    const userRepo = dataSource.getRepository(user_entity_1.WardrobeUserEntity);
    const categoryRepo = dataSource.getRepository(category_entity_1.WardrobeCategoryEntity);
    const itemRepo = dataSource.getRepository(item_entity_1.WardrobeItemEntity);
    const outfitRepo = dataSource.getRepository(outfit_entity_1.WardrobeOutfitEntity);
    // 1) Admin demo user
    const adminPassword = await bcrypt.hash("admin@gmail.com", 10);
    const admin = userRepo.create({
        _id: "64b167e5-a2a0-4cf0-896c-e14585ad2bcb",
        name: "Admin 001",
        username: "admin001",
        email: "admin@gmail.com",
        password: adminPassword,
        role: "admin",
        isActive: true,
    });
    await userRepo.save(admin);
    // 2) Normal demo user
    const passwordHash = await bcrypt.hash("user@gmail.com", 10);
    const user = userRepo.create({
        _id: "87370890-320c-4f1f-9318-6f8345504b74",
        name: "User 007",
        username: "user007",
        email: "user@gmail.com",
        password: passwordHash,
        role: "user",
        isActive: true,
    });
    await userRepo.save(user);
    // 3) Categories
    const categories = categoryRepo.create([
        { name: "Shirts", nameES: "Camisas" },
        { name: "Pants", nameES: "Pantalones" },
        { name: "Shoes", nameES: "Zapatos" },
        { name: "Accessories", nameES: "Accesorios" },
    ]);
    await categoryRepo.save(categories);
    // 4) Items for the normal user
    const [shirts, pants, shoes, accessories] = categories;
    const items = itemRepo.create([
        // bottoms
        {
            name: "Bottom 1",
            size: "M",
            color: "White",
            brand: "Zara",
            image: "/uploads/demo_bottom1.jpg",
            category: pants,
            user: user,
        },
        {
            name: "Bottom 2",
            size: "M",
            color: "Black",
            brand: "Zara",
            image: "/uploads/demo_bottom2.jpg",
            category: pants,
            user: user,
        },
        {
            name: "Bottom 3",
            size: "M",
            color: "Gray",
            brand: "Zara",
            image: "/uploads/demo_bottom3.jpg",
            category: pants,
            user: user,
        },
        {
            name: "Bottom 4",
            size: "M",
            color: "Navy",
            brand: "Zara",
            image: "/uploads/demo_bottom4.jpg",
            category: pants,
            user: user,
        },
        {
            name: "Bottom 5",
            size: "M",
            color: "Beige",
            brand: "Zara",
            image: "/uploads/demo_bottom5.jpg",
            category: pants,
            user: user,
        },
        {
            name: "Bottom 6",
            size: "M",
            color: "Blue",
            brand: "Zara",
            image: "/uploads/demo_bottom6.jpg",
            category: pants,
            user: user,
        },
        {
            name: "Bottom 7",
            size: "M",
            color: "Red",
            brand: "Zara",
            image: "/uploads/demo_bottom7.jpg",
            category: pants,
            user: user,
        },
        // tops
        {
            name: "Top 1",
            size: "32",
            color: "Blue",
            brand: "Levis",
            image: "/uploads/demo_top1.jpg",
            category: shirts,
            user: user,
        },
        {
            name: "Top 2",
            size: "32",
            color: "Black",
            brand: "Levis",
            image: "/uploads/demo_top2.jpg",
            category: shirts,
            user: user,
        },
        {
            name: "Top 3",
            size: "32",
            color: "Gray",
            brand: "Levis",
            image: "/uploads/demo_top3.jpg",
            category: shirts,
            user: user,
        },
        {
            name: "Top 4",
            size: "32",
            color: "White",
            brand: "Levis",
            image: "/uploads/demo_top4.jpg",
            category: shirts,
            user: user,
        },
        {
            name: "Top 5",
            size: "32",
            color: "Navy",
            brand: "Levis",
            image: "/uploads/demo_top5.jpg",
            category: shirts,
            user: user,
        },
        {
            name: "Top 6",
            size: "32",
            color: "Beige",
            brand: "Levis",
            image: "/uploads/demo_top6.jpg",
            category: shirts,
            user: user,
        },
        {
            name: "Top 7",
            size: "32",
            color: "Red",
            brand: "Levis",
            image: "/uploads/demo_top7.jpg",
            category: shirts,
            user: user,
        },
        // {
        //   name: "Nike Air Sneakers",
        //   size: "42",
        //   color: "Black",
        //   brand: "Nike",
        //   image: "/uploads/demo_nike-air.jpg",
        //   category: shoes,
        //   user: user,
        // },
        // {
        //   name: "Casio Watch",
        //   size: "One size",
        //   color: "Silver",
        //   brand: "Casio",
        //   image: "/uploads/demo_casio-watch.jpg",
        //   category: accessories,
        //   user: user,
        // },
    ]);
    await itemRepo.save(items);
    // 5) Demo outfit
    const outfit = outfitRepo.create({
        name: "Casual Friday",
        description: "A relaxed look for Friday",
        user: user,
        items: items,
    });
    await outfitRepo.save(outfit);
    console.log("✅ Seeder executed: Virtual wardrobe with demo data inserted (includes admin)");
}
//# sourceMappingURL=wardrobe.seeder.js.map