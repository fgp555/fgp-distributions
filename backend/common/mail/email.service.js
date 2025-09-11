"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeOrmConfig_1 = require("../../config/typeOrmConfig");
const email_entity_1 = require("./entities/email.entity");
dotenv_1.default.config();
const { MAIL_HOST, MAIL_PORT, MAIL_USER_FROM, MAIL_PASS_FROM, MAIL_USER_TO_CC } = process.env;
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: MAIL_HOST,
            port: Number(MAIL_PORT),
            secure: true,
            auth: {
                user: MAIL_USER_FROM,
                pass: MAIL_PASS_FROM,
            },
            // tls: {
            //   rejectUnauthorized: false, // ⚠️ Solo usar temporalmente si tienes error de certificado
            // },
        });
        this.emailRepo = typeOrmConfig_1.AppDataSource.getRepository(email_entity_1.EmailEntity);
    }
    async sendContactEmail(data) {
        const { name, email, subject, message, currentUrl } = data;
        const bodyMessage = `\n\nNombre: ${name}\nCorreo: ${email}\nMensaje: ${message}\nEnviado desde: ${currentUrl}`;
        const userMessage = {
            from: `"${name}" <${MAIL_USER_FROM}>`,
            to: email,
            subject: subject || "Gracias por contactarnos",
            text: `Gracias por escribirnos, te responderemos pronto.${bodyMessage}`,
        };
        const ccMessage = {
            from: `"${name}" <${MAIL_USER_FROM}>`,
            to: MAIL_USER_TO_CC,
            subject: "Tienes un nuevo formulario",
            text: `Un usuario ha enviado un nuevo formulario.${bodyMessage}`,
        };
        // Enviar ambos correos
        await this.transporter.sendMail(userMessage);
        await this.transporter.sendMail(ccMessage);
        // Guardar en la base de datos
        const newEmail = this.emailRepo.create({
            name,
            email,
            subject: subject || "Gracias por contactarnos",
            message,
            currentUrl,
        });
        await this.emailRepo.save(newEmail);
    }
    async sendResetPasswordEmail(email, resetLink) {
        const mailOptions = {
            from: MAIL_USER_FROM,
            to: email,
            subject: "🔐 Restablece tu contraseña",
            text: `Recibimos una solicitud para restablecer tu contraseña. Haz clic en el siguiente enlace:\n\n${resetLink}\n\nSi no solicitaste esto, ignora este mensaje.`,
            html: `
        <p>Recibimos una solicitud para restablecer tu contraseña.</p>
        <p><a href="${resetLink}">Haz clic aquí para restablecerla</a></p>
        <p>Si no solicitaste esto, puedes ignorar este mensaje.</p>
      `,
        };
        await this.transporter.sendMail(mailOptions);
        // también podrías guardar este envío en BD si quieres:
        // await this.emailRepo.save({ name: 'Reset Password', email, subject: '🔐 Restablece tu contraseña', message: resetLink })
    }
    async findAll(page = 1, limit = 5) {
        const [results, totalItems] = await this.emailRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { id: "DESC" },
        });
        const totalPages = Math.ceil(totalItems / limit);
        const hasMore = page < totalPages;
        return {
            success: true,
            pagination: {
                page,
                totalPages,
                hasMore,
                limit,
            },
            totalItems,
            results,
        };
    }
    async getById(id) {
        return this.emailRepo.findOneBy({ id });
    }
    async update(id, data) {
        await this.emailRepo.update(id, data);
        return this.getById(id);
    }
    async remove(id) {
        return this.emailRepo.delete(id);
    }
    async findAndCount(limit, skip) {
        return this.emailRepo.findAndCount({
            take: limit,
            skip,
            order: { id: "DESC" },
        });
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map