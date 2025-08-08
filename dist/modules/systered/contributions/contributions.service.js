"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionsService = void 0;
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const ContributionEntity_1 = require("./entities/ContributionEntity");
class ContributionsService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(ContributionEntity_1.ContributionEntity);
    }
    async findAll() {
        return await this.repo.find({
            relations: ["user", "period"]
        });
    }
    async findOne(id) {
        return await this.repo.findOne({
            where: { id },
            relations: ["user", "period"]
        });
    }
    async create(data) {
        const contribution = this.repo.create(data);
        return await this.repo.save(contribution);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return await this.findOne(id);
    }
    async remove(id) {
        return await this.repo.delete(id);
    }
}
exports.ContributionsService = ContributionsService;
//# sourceMappingURL=contributions.service.js.map