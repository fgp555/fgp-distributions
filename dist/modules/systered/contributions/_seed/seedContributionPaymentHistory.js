"use strict";
// src/modules/systered/contributions/seeds/payment-history.seed.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedContributionPaymentHistory = seedContributionPaymentHistory;
const PaymentHistoryEntity_1 = require("../entities/PaymentHistoryEntity");
const UserEntity_1 = require("../entities/UserEntity");
const ContributionEntity_1 = require("../entities/ContributionEntity");
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
async function seedContributionPaymentHistory() {
    const historyRepo = typeOrmConfig_1.AppDataSource.getRepository(PaymentHistoryEntity_1.ContributionPaymentHistoryEntity);
    const userRepo = typeOrmConfig_1.AppDataSource.getRepository(UserEntity_1.ContributionUserEntity);
    const contributionRepo = typeOrmConfig_1.AppDataSource.getRepository(ContributionEntity_1.ContributionEntity);
    // console.log("🌱 Iniciando seed de Contribution Payment History...");
    const existing = await historyRepo.count();
    if (existing > 0) {
        console.log(`⚠️ Ya existen ${existing} registros en PaymentHistory, omitiendo seed.`);
        return;
    }
    const users = await userRepo.find();
    const contributions = await contributionRepo.find();
    if (users.length === 0 || contributions.length === 0) {
        console.error("❌ No hay usuarios o contribuciones para asociar historial. Ejecuta primero sus seeds.");
        return;
    }
    const histories = [];
    users.forEach((user, uIndex) => {
        contributions.forEach((contrib, cIndex) => {
            // Simular que cada usuario tiene 2 pagos para cada contribución
            for (let i = 0; i < 2; i++) {
                const paymentDate = new Date();
                paymentDate.setMonth(paymentDate.getMonth() - (uIndex + cIndex + i));
                paymentDate.setDate(5 + i * 10); // días diferentes para variedad
                histories.push(historyRepo.create({
                    paymentDate,
                    amount: 10000 + i * 5000, // valores variados
                    user,
                    contribution: contrib,
                }));
            }
        });
    });
    await historyRepo.save(histories);
    console.log("🌱 contributionPaymentHistorySeeder seed complete ✅");
}
//# sourceMappingURL=seedContributionPaymentHistory.js.map