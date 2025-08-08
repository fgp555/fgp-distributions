"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedContributionPayouts = seedContributionPayouts;
const PayoutEntity_1 = require("../entities/PayoutEntity");
const UserEntity_1 = require("../entities/UserEntity");
const PeriodEntity_1 = require("../entities/PeriodEntity");
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
async function seedContributionPayouts() {
    const payoutRepo = typeOrmConfig_1.AppDataSource.getRepository(PayoutEntity_1.ContributionPayoutEntity);
    const userRepo = typeOrmConfig_1.AppDataSource.getRepository(UserEntity_1.ContributionUserEntity);
    const periodRepo = typeOrmConfig_1.AppDataSource.getRepository(PeriodEntity_1.ContributionPeriodEntity);
    // console.log("🌱 Iniciando seed de Contribution Payouts...");
    const existing = await payoutRepo.count();
    if (existing > 0) {
        console.log(`⚠️ Ya existen ${existing} payouts, omitiendo seed.`);
        return;
    }
    const users = await userRepo.find();
    const periods = await periodRepo.find();
    if (users.length === 0 || periods.length === 0) {
        console.error("❌ No hay usuarios o periodos para asociar payouts. Ejecuta primero sus seeds.");
        return;
    }
    // Tomamos el primer periodo para todos los pagos de ejemplo
    const periodo = periods[0];
    const cuotaFondo1 = 20000;
    const cuotaFondo2 = 50000;
    const payouts = users.map((user, index) => {
        const puesto = index + 1;
        const cuotasAsignadas = 2; // Ejemplo, podrían variar
        const totalPayment = cuotaFondo2 * cuotasAsignadas;
        // Simular que cada pago ocurre el segundo viernes del mes siguiente al puesto
        const paymentDate = new Date(periodo.startDate);
        paymentDate.setMonth(paymentDate.getMonth() + puesto);
        paymentDate.setDate(paymentDate.getDate() + (12 - paymentDate.getDay())); // ajustar a viernes aprox.
        return payoutRepo.create({
            puesto,
            paymentDate,
            cuotaFondo1,
            cuotaFondo2,
            totalPayment,
            user,
            period: periodo,
        });
    });
    await payoutRepo.save(payouts);
    console.log("🌱 contributionPayoutsSeeder seed complete ✅");
}
//# sourceMappingURL=seedContributionPayouts.js.map