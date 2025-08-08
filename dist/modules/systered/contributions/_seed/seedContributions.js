"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedContributions = seedContributions;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const ContributionEntity_1 = require("../entities/ContributionEntity");
const PeriodEntity_1 = require("../entities/PeriodEntity");
const UserEntity_1 = require("../entities/UserEntity");
async function seedContributions() {
    const userRepo = typeOrmConfig_1.AppDataSource.getRepository(UserEntity_1.ContributionUserEntity);
    const contributionRepo = typeOrmConfig_1.AppDataSource.getRepository(ContributionEntity_1.ContributionEntity);
    const periodRepo = typeOrmConfig_1.AppDataSource.getRepository(PeriodEntity_1.ContributionPeriodEntity);
    // console.log("🌱 Iniciando seed de Contributions...");
    // Traemos un usuario y un periodo ya existentes
    const user = await userRepo.findOne({ where: {} });
    const period = await periodRepo.findOne({ where: {} });
    if (!user || !period) {
        console.warn("⚠️ No se encontraron usuario o periodo para crear contributions");
        return;
    }
    // Creamos registros de ejemplo
    const contributions = contributionRepo.create([
        {
            user,
            period,
            fundType: ContributionEntity_1.FundType.FONDO1,
            valuePerQuota: 20000,
            totalQuotas: period.totalQuotas,
            totalAmount: 20000 * period.totalQuotas,
        },
        {
            user,
            period,
            fundType: ContributionEntity_1.FundType.FONDO2,
            valuePerQuota: 50000,
            totalQuotas: period.totalQuotas,
            totalAmount: 50000 * period.totalQuotas,
        },
    ]);
    await contributionRepo.save(contributions);
    console.log("🌱 contributionsSeeder seed complete ✅");
}
//# sourceMappingURL=seedContributions.js.map