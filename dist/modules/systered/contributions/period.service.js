"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodService = void 0;
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const PeriodEntity_1 = require("./entities/PeriodEntity");
class PeriodService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(PeriodEntity_1.ContributionPeriodEntity);
    }
    async findAll() {
        return await this.repo.find({ relations: ["contributions", "payouts"] });
    }
    async findOne(id) {
        const period = await this.repo.findOne({ where: { id }, relations: ["contributions", "payouts"] });
        if (!period)
            throw new Error(`Period with id ${id} not found`);
        return period;
    }
    async create(data) {
        const newPeriod = this.repo.create(data);
        return await this.repo.save(newPeriod);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return await this.findOne(id);
    }
    async remove(id) {
        const period = await this.findOne(id);
        await this.repo.remove(period);
    }
}
exports.PeriodService = PeriodService;
//# sourceMappingURL=period.service.js.map