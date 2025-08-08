"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentHistoryService = void 0;
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const PaymentHistoryEntity_1 = require("./entities/PaymentHistoryEntity");
class PaymentHistoryService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(PaymentHistoryEntity_1.ContributionPaymentHistoryEntity);
    }
    async findAll() {
        return await this.repo.find({
            relations: ["user", "contribution"],
            order: { createdAt: "DESC" }
        });
    }
    async findOne(id) {
        return await this.repo.findOne({
            where: { id },
            relations: ["user", "contribution"]
        });
    }
    async create(data) {
        const entity = this.repo.create(data);
        return await this.repo.save(entity);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return await this.findOne(id);
    }
    async remove(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
}
exports.PaymentHistoryService = PaymentHistoryService;
//# sourceMappingURL=payment-history.service.js.map