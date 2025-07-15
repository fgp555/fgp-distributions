"use strict";
// src/config/data-source.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectionSource = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
// Academy
const category_entity_1 = require("../module/academy/dtos-entities/category.entity");
const course_entity_1 = require("../module/academy/dtos-entities/course.entity");
const lesson_entity_1 = require("../module/academy/dtos-entities/lesson.entity");
const lesson_link_entity_1 = require("../module/academy/dtos-entities/lesson-link.entity");
const lesson_link_premium_entity_1 = require("../module/academy/dtos-entities/lesson-link-premium.entity");
const section_entity_1 = require("../module/academy/dtos-entities/section.entity");
// Auth
const user_entity_1 = require("../module/auth/entities/user.entity");
// Options
const options_entity_1 = require("../module/options/options.entity");
// Project
const project_collaborator_entity_1 = require("../module/project/entities/project-collaborator.entity");
const project_dates_embeddable_1 = require("../module/project/entities/project-dates.embeddable");
const project_entity_1 = require("../module/project/entities/project.entity");
const project_image_entity_1 = require("../module/project/entities/project-image.entity");
const project_link_entity_1 = require("../module/project/entities/project-link.entity");
const project_skill_entity_1 = require("../module/project/entities/project-skill.entity");
const user_entity_2 = require("../module/project/entities/user.entity");
const user_skill_entity_1 = require("../module/project/entities/user-skill.entity");
const project_technology_entity_1 = require("../module/project/entities/project-technology.entity");
const user_link_entity_1 = require("../module/project/entities/user-link.entity");
// Shortener
const shortener_entity_1 = require("../module/shortener/entities/shortener.entity");
const shortener_visit_entity_1 = require("../module/shortener/entities/shortener-visit.entity");
// Stat
const stat_entity_1 = require("../module/stat/entities/stat.entity");
// Store
const product_entity_1 = require("../module/store/product/product.entity");
// Visit
const visit_entity_1 = require("../module/visit/visit.entity");
// Whatsapp
const whatsapp_message_entity_1 = require("../module/whatsapp/entities/whatsapp-message.entity");
// IvanaApps - Outfit
const outfit_entity_1 = require("../ivanaapps/outfit/entities/outfit.entity");
// IvanaApps - Wardrobe
const accessory_entity_1 = require("../ivanaapps/wardrobe/entities/accessory.entity");
const bottom_entity_1 = require("../ivanaapps/wardrobe/entities/bottom.entity");
const wardrobe_entity_1 = require("../ivanaapps/wardrobe/entities/wardrobe.entity");
const top_entity_1 = require("../ivanaapps/wardrobe/entities/top.entity");
const user_wardrobe_entity_1 = require("../ivanaapps/wardrobe-user/entities/user-wardrobe.entity");
const _restaurant_entities_1 = require("../food-business/_restaurant.entities");
const entities = [
    // Academy
    category_entity_1.CategoryEntity,
    course_entity_1.CourseEntity,
    lesson_entity_1.LessonEntity,
    lesson_link_entity_1.LessonLinkEntity,
    lesson_link_premium_entity_1.LessonLinkPremiumEntity,
    section_entity_1.SectionEntity,
    // Auth
    user_entity_1.UserEntity,
    // Options
    options_entity_1.OptionsEntity,
    // Project
    project_collaborator_entity_1.CollaboratorEntity,
    project_dates_embeddable_1.ProjectDates,
    project_entity_1.ProjectEntity,
    project_image_entity_1.ProjectImageEntity,
    project_link_entity_1.ProjectLinkEntity,
    project_skill_entity_1.ProjectSkillEntity,
    user_entity_2.ProjectUserEntity,
    user_skill_entity_1.SkillUserEntity,
    project_technology_entity_1.TechnologyEntity,
    user_link_entity_1.UserLinkEntity,
    // Shortener
    shortener_entity_1.ShortenerEntity,
    shortener_visit_entity_1.ShortenerVisitEntity,
    // Stat
    stat_entity_1.StatEntity,
    // Store
    product_entity_1.ProductEntity,
    // Visit
    visit_entity_1.VisitEntity,
    // Whatsapp
    whatsapp_message_entity_1.WhatsappMessageEntity,
    // IvanaApps - Wardrobe
    accessory_entity_1.WardrobeAccessoryEntity,
    bottom_entity_1.WardrobeBottomEntity,
    wardrobe_entity_1.WardrobeEntity,
    top_entity_1.WardrobeTopEntity,
    user_wardrobe_entity_1.WardrobeUserEntity,
    // IvanaApps - Outfit
    outfit_entity_1.OutfitEntity,
    ..._restaurant_entities_1.restaurat_entities,
];
// Configuración de TypeORM
const typeOrmConfig = {
    type: envs_1.ENV_DB.DB_TYPE,
    host: envs_1.ENV_DB.DB_HOST,
    port: envs_1.ENV_DB.DB_PORT,
    username: envs_1.ENV_DB.DB_USERNAME,
    password: envs_1.ENV_DB.DB_PASSWORD,
    database: envs_1.ENV_DB.DB_DATABASE,
    synchronize: envs_1.ENV_DB.SYNCHRONIZE,
    dropSchema: envs_1.ENV_DB.DROPSCHEMA,
    logging: ["error"],
    entities: entities,
    migrations: ["dist/migrations/*{.ts,.js}"],
    subscribers: [],
    ssl: envs_1.ENV_DB.DB_SSL, // Configuración SSL opcional
};
// Crear la instancia de DataSource
exports.AppDataSource = new typeorm_1.DataSource(typeOrmConfig);
// Exporta el tipo para uso global en otras partes de la app
exports.conectionSource = new typeorm_1.DataSource(typeOrmConfig);
//# sourceMappingURL=data-source.js.map