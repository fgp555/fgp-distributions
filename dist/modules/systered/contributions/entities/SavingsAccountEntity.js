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
exports.SavingsAccountEntity = void 0;
const typeorm_1 = require("typeorm");
const TransactionEntity_1 = require("./TransactionEntity");
const UserEntity_1 = require("./UserEntity");
const SavingsPlanEntity_1 = require("./SavingsPlanEntity");
let SavingsAccountEntity = class SavingsAccountEntity {
};
exports.SavingsAccountEntity = SavingsAccountEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SavingsAccountEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], SavingsAccountEntity.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], SavingsAccountEntity.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SavingsAccountEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity_1.ContributionUserEntity, (customer) => customer.accounts, { onDelete: "CASCADE" }),
    __metadata("design:type", UserEntity_1.ContributionUserEntity)
], SavingsAccountEntity.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TransactionEntity_1.TransactionEntity, (tx) => tx.account),
    __metadata("design:type", Array)
], SavingsAccountEntity.prototype, "transactions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SavingsPlanEntity_1.SavingsPlanEntity, (plan) => plan.accounts),
    __metadata("design:type", SavingsPlanEntity_1.SavingsPlanEntity)
], SavingsAccountEntity.prototype, "plan", void 0);
exports.SavingsAccountEntity = SavingsAccountEntity = __decorate([
    (0, typeorm_1.Entity)("savings_accounts")
], SavingsAccountEntity);
//# sourceMappingURL=SavingsAccountEntity.js.map