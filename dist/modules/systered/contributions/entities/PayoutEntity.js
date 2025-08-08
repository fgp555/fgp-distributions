"use strict";
// src/modules/systered/contributions/entities/PayoutEntity.ts
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
exports.ContributionPayoutEntity = void 0;
const typeorm_1 = require("typeorm");
const UserEntity_1 = require("./UserEntity");
const PeriodEntity_1 = require("./PeriodEntity");
let ContributionPayoutEntity = class ContributionPayoutEntity {
};
exports.ContributionPayoutEntity = ContributionPayoutEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ContributionPayoutEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], ContributionPayoutEntity.prototype, "puesto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], ContributionPayoutEntity.prototype, "paymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], ContributionPayoutEntity.prototype, "cuotaFondo1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], ContributionPayoutEntity.prototype, "cuotaFondo2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], ContributionPayoutEntity.prototype, "totalPayment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity_1.ContributionUserEntity, (user) => user.payouts),
    __metadata("design:type", UserEntity_1.ContributionUserEntity)
], ContributionPayoutEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PeriodEntity_1.ContributionPeriodEntity, (period) => period.payouts),
    __metadata("design:type", PeriodEntity_1.ContributionPeriodEntity)
], ContributionPayoutEntity.prototype, "period", void 0);
exports.ContributionPayoutEntity = ContributionPayoutEntity = __decorate([
    (0, typeorm_1.Entity)("contributions_payouts")
], ContributionPayoutEntity);
//# sourceMappingURL=PayoutEntity.js.map