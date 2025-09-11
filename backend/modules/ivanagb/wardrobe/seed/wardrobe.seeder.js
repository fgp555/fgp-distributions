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
    const admin0Password = await bcrypt.hash("admin@gmail.com", 10);
    const admin0 = userRepo.create({
        _id: "64b167e5-a2a0-4cf0-896c-e14585ad2000",
        name: "Admin 123",
        username: "admin",
        email: "admin@gmail.com",
        password: admin0Password,
        role: "admin",
        isActive: true,
        photo: "/uploads/demo/logo-mixmatch.webp",
    });
    await userRepo.save(admin0);
    const admin1Password = await bcrypt.hash("ivanagbarreto@gmail.com", 10);
    const admin1 = userRepo.create({
        _id: "64b167e5-a2a0-4cf0-896c-e14585ad2111",
        name: "Ivana Geraldine",
        username: "ivanagbarreto",
        email: "ivanagbarreto@gmail.com",
        password: admin1Password,
        role: "admin",
        isActive: true,
        photo: "/uploads/demo/logo-mixmatch.webp",
    });
    await userRepo.save(admin1);
    const admin2Password = await bcrypt.hash("fgp555@gmail.com", 10);
    const admin2 = userRepo.create({
        _id: "64b167e5-a2a0-4cf0-896c-e14585ad2222",
        name: "Frank GP",
        username: "fgp555",
        email: "fgp555@gmail.com",
        password: admin2Password,
        role: "admin",
        isActive: true,
        photo: "/uploads/demo/logo-mixmatch.webp",
    });
    await userRepo.save(admin2);
    // 2) Normal demo user
    const passwordHash = await bcrypt.hash("ana123@gmail.com", 10);
    const user = userRepo.create({
        _id: "87370890-320c-4f1f-9318-6f8345504b74",
        name: "Ana Sofia",
        username: "ana123",
        email: "ana123@gmail.com",
        password: passwordHash,
        role: "user",
        isActive: true,
        photo: "/uploads/demo/icon-user.jpg",
    });
    await userRepo.save(user);
    // 3) Categories
    const categories = categoryRepo.create([
        { id: 1, name: "Tops", nameES: "Tops" },
        { id: 2, name: "Bottoms", nameES: "Bottoms" },
        { id: 3, name: "Accessories", nameES: "Accesorios" },
    ]);
    await categoryRepo.save(categories);
    // 4) Items for the normal user
    const [Tops, Bottoms, Accessories] = categories;
    const dataItems = itemRepo.create([
        // Tops
        {
            description: "White Cotton T-Shirt",
            image: "/uploads/demo/item_top1.jpg",
            category: Tops,
        },
        {
            description: "Blue Denim Shirt",
            image: "/uploads/demo/item_top2.jpg",
            category: Tops,
        },
        {
            description: "Black Hoodie",
            image: "/uploads/demo/item_top3.jpg",
            category: Tops,
        },
        {
            description: "Red Polo Shirt",
            image: "/uploads/demo/item_top4.jpg",
            category: Tops,
        },
        {
            description: "Striped Long Sleeve",
            image: "/uploads/demo/item_top5.jpg",
            category: Tops,
        },
        {
            description: "Green Sports Jersey",
            image: "/uploads/demo/item_top6.jpg",
            category: Tops,
        },
        {
            description: "Classic White Dress Shirt",
            image: "/uploads/demo/item_top7.jpg",
            category: Tops,
        },
        // Bottoms
        {
            description: "Blue Slim Jeans",
            image: "/uploads/demo/item_bottom1.jpg",
            category: Bottoms,
        },
        {
            description: "Black Chino Pants",
            image: "/uploads/demo/item_bottom2.jpg",
            category: Bottoms,
        },
        {
            description: "Gray Sweatpants",
            image: "/uploads/demo/item_bottom3.jpg",
            category: Bottoms,
        },
        {
            description: "Beige Cargo Pants",
            image: "/uploads/demo/item_bottom4.jpg",
            category: Bottoms,
        },
        {
            description: "Navy Shorts",
            image: "/uploads/demo/item_bottom5.jpg",
            category: Bottoms,
        },
        {
            description: "Black Tailored Trousers",
            image: "/uploads/demo/item_bottom6.jpg",
            category: Bottoms,
        },
        {
            description: "White Tennis Shorts",
            image: "/uploads/demo/item_bottom7.jpg",
            category: Bottoms,
        },
        // Accessories
        {
            description: "Nike Air Sneakers",
            image: "/uploads/demo/item_accesory1.png",
            category: Accessories,
        },
        {
            description: "Casio Watch",
            image: "/uploads/demo/item_accesory2.png",
            category: Accessories,
        },
        {
            description: "Ray-Ban Sunglasses",
            image: "/uploads/demo/item_accesory3.png",
            category: Accessories,
        },
        {
            description: "Leather Wallet",
            image: "/uploads/demo/item_accesory4.png",
            category: Accessories,
        },
        {
            description: "Adidas Backpack",
            image: "/uploads/demo/item_accesory5.png",
            category: Accessories,
        },
    ]);
    // await itemRepo.save(dataItems);
    // obtenemos todos los usuarios
    const allUsers = await userRepo.find();
    // para cada user, creamos sus items
    for (const u of allUsers) {
        const userItems = dataItems.map((b) => itemRepo.create({ ...b, user: u }));
        await itemRepo.save(userItems);
        // opcional: outfit demo para cada user
        const outfit = outfitRepo.create({
            name: "Casual Friday",
            description: "A relaxed look for Friday",
            user: u,
            items: userItems,
        });
        await outfitRepo.save(outfit);
    }
    // 5) Demo outfit
    const outfit = outfitRepo.create({
        name: "Casual Friday",
        description: "A relaxed look for Friday",
        user: user,
        items: dataItems,
    });
    await outfitRepo.save(outfit);
    console.log("✅ Seeder executed: Virtual wardrobe with demo data inserted (includes admin)");
}
//# sourceMappingURL=wardrobe.seeder.js.map