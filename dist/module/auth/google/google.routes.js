"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envs_1 = require("../../../config/envs");
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const user_model_1 = __importDefault(require("../user/models/user.model")); // Asegúrate de que esta ruta sea correcta
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || "mi_super_secreto";
const JWT_EXPIRES_IN = "1d";
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", { session: false, failureRedirect: "/login" }), async (req, res) => {
    try {
        const profileGoogle = req.user;
        const email = profileGoogle.emails?.[0]?.value || "";
        let user = await user_model_1.default.findOne({ email });
        if (!user) {
            // Crear nuevo usuario
            user = new user_model_1.default({
                googleId: profileGoogle.id,
                name: profileGoogle.name.givenName,
                lastName: profileGoogle.name.familyName,
                displayName: profileGoogle.displayName,
                email,
                photo: profileGoogle.photos?.[0]?.value,
                rawGoogle: profileGoogle._raw,
            });
        }
        else {
            // Actualizar datos existentes
            user.googleId = profileGoogle.id;
            user.name = profileGoogle.name.givenName;
            user.lastName = profileGoogle.name.familyName;
            user.displayName = profileGoogle.displayName;
            user.photo = profileGoogle.photos?.[0]?.value;
            user.rawGoogle = profileGoogle._raw;
        }
        await user.save();
        const jwtExpiresInSeconds = 60 * 60 * 24; // 1 día
        const payload = {
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                isVisible: user.isVisible,
                photo: user.photo,
            },
            accessToken: jsonwebtoken_1.default.sign({ sub: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }),
            refreshToken: jsonwebtoken_1.default.sign({ sub: user._id }, JWT_SECRET, { expiresIn: "7d" }),
            loginDate: new Date().toLocaleString(),
            expirationDate: new Date(Date.now() + jwtExpiresInSeconds * 1000).toLocaleString(),
            sub: user._id,
        };
        const jwtToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.redirect(`${envs_1.CLIENT_URL}/auth/success?token=${jwtToken}`);
    }
    catch (error) {
        console.error("OAuth Callback Error:", error);
        res.status(500).json({ message: "Error al procesar el usuario de Google", error });
    }
});
exports.default = router;
//# sourceMappingURL=google.routes.js.map