"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/passport-google.ts
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const envs_1 = require("../../../config/envs");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: envs_1.GOOGLE_CLIENT_ID,
    clientSecret: envs_1.GOOGLE_CLIENT_SECRET,
    callbackURL: envs_1.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    return done(null, profile); // lo usamos como req.user
}));
//# sourceMappingURL=passport.config.js.map