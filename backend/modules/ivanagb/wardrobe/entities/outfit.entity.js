"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeOutfitEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const item_entity_1 = require("./item.entity");
let WardrobeOutfitEntity = class WardrobeOutfitEntity {
};
exports.WardrobeOutfitEntity = WardrobeOutfitEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WardrobeOutfitEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WardrobeOutfitEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WardrobeOutfitEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.WardrobeUserEntity, user => user.outfits),
    __metadata("design:type", user_entity_1.WardrobeUserEntity)
], WardrobeOutfitEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => item_entity_1.WardrobeItemEntity, { eager: true }),
    (0, typeorm_1.JoinTable)({
        name: "outfit_items",
        joinColumn: { name: "outfit_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "item_id", referencedColumnName: "id" }
    }),
    __metadata("design:type", Array)
], WardrobeOutfitEntity.prototype, "items", void 0);
exports.WardrobeOutfitEntity = WardrobeOutfitEntity = __decorate([
    (0, typeorm_1.Entity)("wardrobe_outfits")
], WardrobeOutfitEntity);
//# sourceMappingURL=outfit.entity.js.map