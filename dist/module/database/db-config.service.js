"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConfigService = void 0;
const data_source_1 = require("../../config/data-source");
const seed_service_1 = require("../../seed/seed.service");
class DBConfigService {
    async dropAndSync() {
        const connection = data_source_1.AppDataSource;
        if (!connection.isInitialized) {
            await connection.initialize();
        }
        console.info("🧨 Dropping schema...");
        await connection.dropDatabase();
        console.info("🔁 Synchronizing schema...");
        await connection.synchronize();
        return { message: "Schema dropped and synchronized successfully" };
    }
    async dropAndSeed() {
        await this.dropAndSync();
        await (0, seed_service_1.runSeeders)();
    }
    async runSQLQuery(query) {
        const connection = data_source_1.AppDataSource;
        if (!connection.isInitialized) {
            await connection.initialize();
        }
        try {
            const result = await connection.query(query);
            return { success: true, result };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
}
exports.DBConfigService = DBConfigService;
//# sourceMappingURL=db-config.service.js.map