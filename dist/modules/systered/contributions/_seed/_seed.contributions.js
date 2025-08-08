"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeedersContributions = void 0;
const seedContributionPaymentHistory_1 = require("./seedContributionPaymentHistory");
const seedContributionPayouts_1 = require("./seedContributionPayouts");
const seedContributionPeriods_1 = require("./seedContributionPeriods");
const seedContributions_1 = require("./seedContributions");
const seedContributionUsers_1 = require("./seedContributionUsers");
const runSeedersContributions = async () => {
    await (0, seedContributionUsers_1.seedContributionUsers)();
    await (0, seedContributionPeriods_1.seedContributionPeriods)();
    await (0, seedContributions_1.seedContributions)();
    await (0, seedContributionPayouts_1.seedContributionPayouts)();
    await (0, seedContributionPaymentHistory_1.seedContributionPaymentHistory)();
};
exports.runSeedersContributions = runSeedersContributions;
//# sourceMappingURL=_seed.contributions.js.map