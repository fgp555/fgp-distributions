"use strict";
// src/common/auth/oauth.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthMongoDBService = void 0;
const envs_1 = require("../config/envs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("./models/user.model"));
const slugify_1 = require("../utils/slugify");
class OAuthMongoDBService {
    async handleOAuth(profileGoogle) {
        const email = profileGoogle.emails?.[0]?.value || "";
        const username = (0, slugify_1.toSlug)(profileGoogle.name.givenName);
        let user = await user_model_1.default.findOne({ email });
        if (!user) {
            user = new user_model_1.default({
                googleId: profileGoogle.id,
                username,
                name: profileGoogle.name.givenName,
                lastName: profileGoogle.name.familyName,
                displayName: profileGoogle.displayName,
                email,
                photo: profileGoogle.photos?.[0]?.value,
                rawGoogle: profileGoogle._raw,
            });
        }
        else {
            user.googleId = profileGoogle.id;
            user.name = profileGoogle.name.givenName;
            user.lastName = profileGoogle.name.familyName;
            user.displayName = profileGoogle.displayName;
            user.photo = profileGoogle.photos?.[0]?.value;
            user.rawGoogle = profileGoogle._raw;
        }
        await user.save();
        const accessToken = jsonwebtoken_1.default.sign({
            sub: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            photo: user.photo,
            roles: [user.role],
            tokenType: "access",
        }, envs_1.ENV_JWT.ACCESS_TOKEN_SECRET, { expiresIn: envs_1.ENV_JWT.ACCESS_TOKEN_EXPIRES });
        const refreshToken = jsonwebtoken_1.default.sign({
            sub: user._id,
            email: user.email,
            roles: [user.role],
            tokenType: "refresh",
        }, envs_1.ENV_JWT.REFRESH_TOKEN_SECRET, { expiresIn: envs_1.ENV_JWT.REFRESH_TOKEN_EXPIRES });
        return { accessToken, refreshToken };
    }
}
exports.OAuthMongoDBService = OAuthMongoDBService;
//# sourceMappingURL=oauth.mongodb.service.js.map