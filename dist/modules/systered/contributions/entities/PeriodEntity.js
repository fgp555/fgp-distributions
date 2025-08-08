"use strict";
// src/modules/systered/contributions/entities/PeriodEntity.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionPeriodEntity = void 0;
const typeorm_1 = require("typeorm");
const ContributionEntity_1 = require("./ContributionEntity");
const PayoutEntity_1 = require("./PayoutEntity");
let ContributionPeriodEntity = class ContributionPeriodEntity {
};
exports.ContributionPeriodEntity = ContributionPeriodEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ContributionPeriodEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContributionPeriodEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], ContributionPeriodEntity.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], ContributionPeriodEntity.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 27 }),
    __metadata("design:type", Number)
], ContributionPeriodEntity.prototype, "totalQuotas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ContributionEntity_1.ContributionEntity, (contrib) => contrib.period),
    __metadata("design:type", Array)
], ContributionPeriodEntity.prototype, "contributions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PayoutEntity_1.ContributionPayoutEntity, (payout) => payout.period),
    __metadata("design:type", Array)
], ContributionPeriodEntity.prototype, "payouts", void 0);
exports.ContributionPeriodEntity = ContributionPeriodEntity = __decorate([
    (0, typeorm_1.Entity)("contributions_periods")
], ContributionPeriodEntity);
//# sourceMappingURL=PeriodEntity.js.map