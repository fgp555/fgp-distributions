"use strict";
// src/common/auth/oauth.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthController = void 0;
const envs_1 = require("../../config/envs");
const oauth_service_1 = require("../service/oauth.service");
const service = new oauth_service_1.OAuthSQLService();
class OAuthController {
    async googleCallback(req, res) {
        try {
            // 🔹 1. Procesar usuario autenticado por Google
            const { accessToken, refreshToken } = await service.handleOAuth(req.user);
            // 🔹 2. Detectar si es un dispositivo móvil
            const userAgent = req.headers["user-agent"] || "";
            const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
            const queryParams = `accessToken=${accessToken}&refreshToken=${refreshToken}`;
            // 🔹 4. Redirigir según el tipo de dispositivo
            if (isMobile) {
                // Deep link para la app nativa
                return res.redirect(`${envs_1.ENV_GOOGLE.MOBILE_SCHEME}success?` + queryParams);
            }
            // Versión web
            return res.redirect(`${envs_1.ENV_GOOGLE.CLIENT_URL}/oauth/google/success?` + queryParams);
        }
        catch (error) {
            console.error("OAuth Callback Error:", error);
            return res.status(500).json({
                message: "Error al procesar el usuario de Google",
                error: error.message,
            });
        }
    }
}
exports.OAuthController = OAuthController;
//# sourceMappingURL=oauth.controller.js.map