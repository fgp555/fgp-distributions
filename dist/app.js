"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 🌐 Core imports
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
// 🛠️ Middleware y utilidades
const morganLogger_1 = require("./utils/morganLogger");
const asyncHandler_1 = require("./utils/asyncHandler");
const error_middleware_1 = require("./middleware/error.middleware");
const visit_middleware_1 = require("./middleware/visit.middleware");
const setupFrontendFallback_1 = require("./utils/setupFrontendFallback");
const envs_1 = require("./config/envs");
// 📦 Rutas: Core funcionalidad
const shortener_controller_1 = require("./common/shortener/shortener.controller");
const _index_routes_1 = __importDefault(require("./auth/_index.routes"));
const email_routes_1 = __importDefault(require("./common/mail/email.routes"));
const info_routes_1 = __importDefault(require("./common/info/info.routes"));
const options_routes_1 = __importDefault(require("./common/options/options.routes"));
const index_routes_1 = __importDefault(require("./common/shortener/index.routes"));
const index_routes_2 = __importDefault(require("./common/stat/index.routes"));
const visit_routes_1 = __importDefault(require("./common/visit/visit.routes"));
const whatsapp_routes_1 = __importDefault(require("./common/whatsapp/whatsapp.routes"));
const academy_index_routes_1 = __importDefault(require("./modules/frankgp/academy/academy.index.routes"));
const product_routes_1 = __importDefault(require("./modules/frankgp/ecommerce/product/product.routes"));
const index_routes_3 = __importDefault(require("./modules/frankgp/project/index.routes"));
// 🧪 Otros (DB, Seed)
const database_routes_1 = __importDefault(require("./common/database/database.routes"));
const mongoose_routes_1 = __importDefault(require("./common/database/mongoose/mongoose.routes"));
// 👗 ivanagb
const _ivanagb_routes_1 = __importDefault(require("./modules/ivanagb/_ivanagb.routes"));
// 🍽️ Restaurant
const _restautant_routes_1 = __importDefault(require("./modules/systered/food/_restautant.routes"));
// 👨‍💻 Systered
const _contributions_routes_1 = __importDefault(require("./modules/systered/contributions/_contributions.routes"));
// 🚀 Inicialización de app
const app = (0, express_1.default)();
// 🧾 Logging y CORS
app.use(morganLogger_1.morganLogger);
app.use((0, cors_1.default)());
// ⚠️ Webhook con raw body parser
app.use("/api/whatsapp/webhook", body_parser_1.default.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString("utf8");
    },
}));
// 🧠 Sesiones y JSON parser
app.use((0, express_session_1.default)({
    secret: "mi_secreto",
    resave: false,
    saveUninitialized: false,
}));
app.use(express_1.default.json());
app.use(visit_middleware_1.countVisitMiddleware);
// 📂 Archivos estáticos
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// 🔐 Passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// 🚏 Rutas API Modules
app.use("/api", _index_routes_1.default);
app.use("/api", _ivanagb_routes_1.default);
app.use("/api", _restautant_routes_1.default);
app.use("/api", _contributions_routes_1.default);
// 🚏 Rutas API
app.use("/api/email", email_routes_1.default);
app.use("/api/shortener", index_routes_1.default);
app.use("/api/info", info_routes_1.default);
app.use("/api/options", options_routes_1.default);
app.use("/api/projects", index_routes_3.default);
app.use("/api/stat", index_routes_2.default);
app.use("/api/visits", visit_routes_1.default);
app.use("/api/whatsapp", whatsapp_routes_1.default);
app.use("/api/product", product_routes_1.default);
app.use("/api/academy", academy_index_routes_1.default);
// 🧪 Base de datos y seed
app.use("/api/db", database_routes_1.default);
app.use("/api/mongoose", mongoose_routes_1.default);
// 🔁 Redirección pública
app.get("/:code", (0, asyncHandler_1.asyncHandler)(new shortener_controller_1.ShortenerController().redirect));
// 🌐 Frontend fallback (SPA)
if (envs_1.ENABLE_FRONTEND) {
    const clientBuildPath = path_1.default.join(__dirname, "../../frankgp-dist/frontend");
    (0, setupFrontendFallback_1.setupFrontendFallback)(app, clientBuildPath);
}
// ❌ Manejo global de errores
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map