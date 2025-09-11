"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lesson_controller_1 = require("./lesson.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new lesson_controller_1.LessonController();
router.post("/create", (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.get("/getAll", (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/getById/:id", (0, asyncHandler_1.asyncHandler)(controller.getById.bind(controller)));
router.get("/getBySlug/:slug", (0, asyncHandler_1.asyncHandler)(controller.findSlug.bind(controller)));
router.get("/getBySection/:sectionId", (0, asyncHandler_1.asyncHandler)(controller.findBySection.bind(controller)));
router.patch("/update/:id", (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/delete/:id", (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
exports.default = router;
//# sourceMappingURL=lesson.routes.js.map