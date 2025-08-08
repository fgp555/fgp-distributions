"use strict";
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
exports.ContributionUserEntity = void 0;
// src/modules/systered/contributions/entities/UserEntity.ts
const typeorm_1 = require("typeorm");
const ContributionEntity_1 = require("./ContributionEntity");
const PayoutEntity_1 = require("./PayoutEntity");
const roles_enum_1 = require("../../../../auth/enum/roles.enum");
const SavingsAccountEntity_1 = require("./SavingsAccountEntity");
let ContributionUserEntity = class ContributionUserEntity {
};
exports.ContributionUserEntity = ContributionUserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ContributionUserEntity.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], ContributionUserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContributionUserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], ContributionUserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContributionUserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], ContributionUserEntity.prototype, "documentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContributionUserEntity.prototype, "whatsapp", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: true, nullable: true }),
    __metadata("design:type", String)
], ContributionUserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContributionUserEntity.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: roles_enum_1.UserRoleEnum,
        default: roles_enum_1.UserRoleEnum.USER,
    }),
    __metadata("design:type", String)
], ContributionUserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ContributionUserEntity.prototype, "isVisible", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ContributionUserEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContributionUserEntity.prototype, "googleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], ContributionUserEntity.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ContributionUserEntity.prototype, "rawGoogle", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ContributionUserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ContributionUserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ContributionEntity_1.ContributionEntity, (contrib) => contrib.user),
    __metadata("design:type", Array)
], ContributionUserEntity.prototype, "contributions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PayoutEntity_1.ContributionPayoutEntity, (payout) => payout.user),
    __metadata("design:type", Array)
], ContributionUserEntity.prototype, "payouts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SavingsAccountEntity_1.SavingsAccountEntity, account => account.customer),
    __metadata("design:type", Array)
], ContributionUserEntity.prototype, "accounts", void 0);
exports.ContributionUserEntity = ContributionUserEntity = __decorate([
    (0, typeorm_1.Entity)("savings_users")
], ContributionUserEntity);
//# sourceMappingURL=UserEntity.js.map