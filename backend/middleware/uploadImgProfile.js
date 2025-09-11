"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImgProfile = void 0;
// src/middleware/upload.middleware.ts
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const UPLOAD_PATH = path_1.default.join(__dirname, "../../uploads");
// Crear carpeta si no existe
if (!fs_1.default.existsSync(UPLOAD_PATH))
    fs_1.default.mkdirSync(UPLOAD_PATH, { recursive: true });
exports.uploadImgProfile = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (_, __, cb) => cb(null, UPLOAD_PATH),
        filename: (req, file, cb) => {
            const ext = path_1.default.extname(file.originalname);
            const username = (req.body?.username || "profile").toString().replace(/\s+/g, "_");
            cb(null, `profile-${username}-${Date.now()}${ext}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
//# sourceMappingURL=uploadImgProfile.js.map