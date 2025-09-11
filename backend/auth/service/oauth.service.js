"use strict";
// src/common/auth/oauth-sql.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthSQLService = void 0;
const typeOrmConfig_1 = require("../../config/typeOrmConfig");
const envs_1 = require("../../config/envs");
const switchModule_1 = require("../../config/switchModule");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class OAuthSQLService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository((0, switchModule_1.selectUserEntity)());
    }
    async handleOAuth(profileGoogle) {
        const email = profileGoogle.emails?.[0]?.value || "";
        // 🔹 Generar username según la regla
        let username = "";
        if (email.endsWith("@gmail.com")) {
            // si es gmail -> solo parte antes de @
            username = email.split("@")[0];
        }
        else {
            // si no es gmail -> usuario + proveedor sin extensión
            const [local, domain] = email.split("@"); // local=usuario, domain=hotmail.com
            const provider = domain.split(".")[0]; // hotmail
            username = local + provider;
        }
        let user = await this.repo.findOne({ where: { email } });
        if (!user) {
            user = this.repo.create({
                googleId: profileGoogle.id,
                name: profileGoogle.name.givenName,
                lastName: profileGoogle.name.familyName,
                displayName: profileGoogle.displayName,
                email,
                username, // 👈 asignar username
                photo: profileGoogle.photos?.[0]?.value,
                rawGoogle: profileGoogle._raw,
            });
        }
        else {
            // Usuario existente: actualiza campos excepto la foto si ya tiene
            user.googleId = profileGoogle.id;
            user.name = profileGoogle.name.givenName;
            user.lastName = profileGoogle.name.familyName;
            user.displayName = profileGoogle.displayName;
            // 🔹 Solo actualizar photo si no tiene
            if (!user.photo) {
                user.photo = profileGoogle.photos?.[0]?.value;
            }
            user.rawGoogle = profileGoogle._raw;
            // Solo asignar username si no tiene uno
            if (!user.username) {
                user.username = username;
            }
        }
        await this.repo.save(user);
        const accessToken = jsonwebtoken_1.default.sign({
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            photo: user.photo,
            role: user.role,
            tokenType: "access",
        }, envs_1.ENV_JWT.ACCESS_TOKEN_SECRET, { expiresIn: envs_1.ENV_JWT.ACCESS_TOKEN_EXPIRES });
        const refreshToken = jsonwebtoken_1.default.sign({
            _id: user._id,
            userId: user._id,
            email: user.email,
            role: user.role,
            tokenType: "refresh",
        }, envs_1.ENV_JWT.REFRESH_TOKEN_SECRET, { expiresIn: envs_1.ENV_JWT.REFRESH_TOKEN_EXPIRES });
        return { accessToken, refreshToken };
    }
}
exports.OAuthSQLService = OAuthSQLService;
//# sourceMappingURL=oauth.service.js.map