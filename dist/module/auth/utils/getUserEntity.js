"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserEntity = getUserEntity;
const user_wardrobe_entity_1 = require("../../../ivanaapps/wardrobe-user/entities/user-wardrobe.entity");
const user_entity_1 = require("../entities/user.entity");
// export const getUserEntity = () => (USE_WARDROBE ? WardrobeUserEntity : UserEntity);
function getUserEntity() {
    const entityType = process.env.USER_ENTITY;
    switch (entityType) {
        case "wardrobe":
            return user_wardrobe_entity_1.WardrobeUserEntity;
        case "default":
        default:
            return user_entity_1.UserEntity;
    }
}
//# sourceMappingURL=getUserEntity.js.map