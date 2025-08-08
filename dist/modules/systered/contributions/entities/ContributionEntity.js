"use strict";
// src/modules/systered/contributions/entities/ContributionEntity.ts
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
exports.ContributionEntity = exports.FundType = void 0;
const typeorm_1 = require("typeorm");
const UserEntity_1 = require("./UserEntity");
const PeriodEntity_1 = require("./PeriodEntity");
var FundType;
(function (FundType) {
    FundType["FONDO1"] = "FONDO1";
    FundType["FONDO2"] = "FONDO2";
})(FundType || (exports.FundType = FundType = {}));
let ContributionEntity = class ContributionEntity {
};
exports.ContributionEntity = ContributionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ContributionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: FundType }),
    __metadata("design:type", String)
], ContributionEntity.prototype, "fundType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], ContributionEntity.prototype, "valuePerQuota", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], ContributionEntity.prototype, "totalQuotas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], ContributionEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity_1.ContributionUserEntity, (user) => user.contributions),
    __metadata("design:type", UserEntity_1.ContributionUserEntity)
], ContributionEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PeriodEntity_1.ContributionPeriodEntity, (period) => period.contributions),
    __metadata("design:type", PeriodEntity_1.ContributionPeriodEntity)
], ContributionEntity.prototype, "period", void 0);
exports.ContributionEntity = ContributionEntity = __decorate([
    (0, typeorm_1.Entity)("contributions")
], ContributionEntity);
//# sourceMappingURL=ContributionEntity.js.map