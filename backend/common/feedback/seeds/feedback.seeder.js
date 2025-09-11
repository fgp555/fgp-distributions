"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedFeedbackSQL = void 0;
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const feedback_entity_1 = require("../entities/feedback.entity");
/**
 * Datos base de feedbacks
 */
const getFeedbacks = async () => {
    const baseFeedbacks = [
        {
            title: "Sugerencia sobre el sistema",
            message: "Me gustaría que agreguen un modo oscuro",
            userEmail: "user123@gmail.com",
        },
        {
            title: "Agregar notificaciones",
            message: "Sería genial recibir notificaciones push",
            userEmail: "admin@gmail.com",
        },
        {
            title: "Soporte multilenguaje",
            message: "Agregar inglés y portugués",
            userEmail: "superadmin@gmail.com",
        },
    ];
    // Si quieres inyectar feedback desde variables de entorno
    const feedbackTitle = process.env.FEEDBACK_TITLE_SEED;
    const feedbackMessage = process.env.FEEDBACK_MESSAGE_SEED;
    const feedbackUserId = process.env.FEEDBACK_USER_ID_SEED;
    if (feedbackTitle && feedbackMessage) {
        baseFeedbacks.push({
            title: feedbackTitle,
            message: feedbackMessage,
            userEmail: feedbackUserId ? feedbackUserId : undefined,
        });
    }
    return baseFeedbacks;
};
/**
 * Seeder SQL
 */
const seedFeedbackSQL = async () => {
    try {
        const feedbacks = await getFeedbacks();
        const feedbackRepository = typeOrmConfig_1.AppDataSource.getRepository(feedback_entity_1.FeedbackEntity);
        for (const fb of feedbacks) {
            // Evita duplicados por title + message
            const exists = await feedbackRepository.findOne({
                where: { title: fb.title, message: fb.message },
            });
            if (!exists) {
                const newFeedback = feedbackRepository.create(fb);
                await feedbackRepository.save(newFeedback);
            }
            else {
                console.info(`ℹ️ [SQL] Already exists: ${fb.title}`);
            }
        }
        console.info("🌱 seedFeedbackSQL complete ✅");
    }
    catch (error) {
        console.error("❌ [SQL] Error seeding feedbacks:", error);
    }
};
exports.seedFeedbackSQL = seedFeedbackSQL;
// Para ejecutarlo directamente con ts-node
if (require.main === module) {
    typeOrmConfig_1.AppDataSource.initialize()
        .then(exports.seedFeedbackSQL)
        .then(() => process.exit(0))
        .catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
//# sourceMappingURL=feedback.seeder.js.map