"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
require("./module/database/database.cron");
const data_source_1 = require("./config/data-source");
const countBoot_1 = require("./utils/countBoot");
const envs_1 = require("./config/envs");
const seed_service_1 = require("./seed/seed.service");
const socket_1 = require("./socket");
const mongoose_1 = require("./config/mongoose");
const startServer = async () => {
    try {
        // 🧠 Conectar MongoDB
        await (0, mongoose_1.connectMongo)();
        // 🧠 Inicializar base relacional (TypeORM)
        await data_source_1.AppDataSource.initialize();
        console.info("📦 Data source initialized");
        await (0, countBoot_1.countBoot)();
        if (process.env.SEED_DATA === "true") {
            // 🌱 Ejecutar seeders ✅
            await (0, seed_service_1.runSeeders)();
        }
        socket_1.httpServer.listen(envs_1.PORT, () => {
            console.info(`🚀 Server running on http://localhost:${envs_1.PORT}`);
        });
    }
    catch (err) {
        console.error("❌ Error al iniciar el servidor", err);
    }
};
startServer();
//# sourceMappingURL=main.js.map