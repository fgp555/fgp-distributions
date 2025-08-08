"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contributions_entities = void 0;
const ContributionEntity_1 = require("./ContributionEntity");
const PaymentHistoryEntity_1 = require("./PaymentHistoryEntity");
const PayoutEntity_1 = require("./PayoutEntity");
const PeriodEntity_1 = require("./PeriodEntity");
const SavingsAccountEntity_1 = require("./SavingsAccountEntity");
const SavingsPlanEntity_1 = require("./SavingsPlanEntity");
const TransactionEntity_1 = require("./TransactionEntity");
const UserEntity_1 = require("./UserEntity");
exports.contributions_entities = [
    ContributionEntity_1.ContributionEntity,
    PaymentHistoryEntity_1.ContributionPaymentHistoryEntity,
    PayoutEntity_1.ContributionPayoutEntity,
    PeriodEntity_1.ContributionPeriodEntity,
    UserEntity_1.ContributionUserEntity,
    // 
    SavingsAccountEntity_1.SavingsAccountEntity,
    SavingsPlanEntity_1.SavingsPlanEntity,
    TransactionEntity_1.TransactionEntity
];
//# sourceMappingURL=_contributions.entities.js.map