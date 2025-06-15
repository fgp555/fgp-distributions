"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = void 0;
// src/config/mongoose.ts
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/miapp";
const connectMongo = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("🍃 MongoDB conectado");
    }
    catch (error) {
        console.error("❌ Error conectando a MongoDB:", error);
        throw error;
    }
};
exports.connectMongo = connectMongo;
//# sourceMappingURL=mongoose.js.map