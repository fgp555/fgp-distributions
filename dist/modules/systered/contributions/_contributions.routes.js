"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contributions_routes_1 = __importDefault(require("./contributions.routes"));
const period_routes_1 = __importDefault(require("./period.routes"));
const payout_routes_1 = __importDefault(require("./payout.routes"));
const payment_history_routes_1 = __importDefault(require("./payment-history.routes"));
const router = (0, express_1.Router)();
router.use("/contributions", contributions_routes_1.default);
router.use("/contributions/period", period_routes_1.default);
router.use("/contributions/payout", payout_routes_1.default);
router.use("/contributions/payment-history", payment_history_routes_1.default);
exports.default = router;
//# sourceMappingURL=_contributions.routes.js.map