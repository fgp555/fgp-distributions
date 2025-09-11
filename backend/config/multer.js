"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
// src/config/multer.ts
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path_1.default.join(__dirname, "../../uploads");
        fs_1.default.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const username = req.body.username || "anonymous";
        const uniqueSuffix = Date.now();
        const ext = path_1.default.extname(file.originalname);
        cb(null, username + "-" + uniqueSuffix + ext);
    },
});
exports.upload = (0, multer_1.default)({ storage });
//# sourceMappingURL=multer.js.map