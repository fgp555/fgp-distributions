"use strict";
// src/modules/systered/contributions/seeds/period.seed.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedContributionPeriods = seedContributionPeriods;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const PeriodEntity_1 = require("../entities/PeriodEntity");
async function seedContributionPeriods() {
    const periodRepo = typeOrmConfig_1.AppDataSource.getRepository(PeriodEntity_1.ContributionPeriodEntity);
    // console.log("🌱 Iniciando seed de Contribution Periods...");
    const existing = await periodRepo.count();
    if (existing > 0) {
        console.log(`⚠️ Ya existen ${existing} períodos, omitiendo seed.`);
        return;
    }
    const periods = [
        periodRepo.create({
            name: "Sept 2024 - Ago 2025",
            startDate: new Date("2024-09-01"),
            endDate: new Date("2025-08-31"),
            totalQuotas: 27,
        }),
        periodRepo.create({
            name: "Sept 2025 - Ago 2026",
            startDate: new Date("2025-09-01"),
            endDate: new Date("2026-08-31"),
            totalQuotas: 27,
        }),
    ];
    await periodRepo.save(periods);
    console.log("🌱 contributionPeriodsSeeder seed complete ✅");
}
//# sourceMappingURL=seedContributionPeriods.js.map