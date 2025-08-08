"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutService = void 0;
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const PayoutEntity_1 = require("./entities/PayoutEntity");
class PayoutService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(PayoutEntity_1.ContributionPayoutEntity);
    }
    async findAll() {
        return await this.repo.find({ relations: ["user", "period"] });
    }
    async findOne(id) {
        const payout = await this.repo.findOne({
            where: { id },
            relations: ["user", "period"]
        });
        if (!payout)
            throw new Error(`Payout with id ${id} not found`);
        return payout;
    }
    async create(data) {
        const newPayout = this.repo.create(data);
        return await this.repo.save(newPayout);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return await this.findOne(id);
    }
    async remove(id) {
        const payout = await this.findOne(id);
        await this.repo.remove(payout);
    }
}
exports.PayoutService = PayoutService;
//# sourceMappingURL=payout.service.js.map