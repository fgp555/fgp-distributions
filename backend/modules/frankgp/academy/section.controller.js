"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionController = void 0;
const section_service_1 = require("./section.service");
class SectionController {
    constructor() {
        this.service = new section_service_1.SectionService();
    }
    async create(req, res) {
        const section = await this.service.create(req.body);
        res.status(201).json(section);
    }
    async getAll(_req, res) {
        const sections = await this.service.getAll();
        res.json(sections);
    }
    async getById(req, res) {
        const id = Number(req.params.id);
        const section = await this.service.getById(id);
        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }
        res.json(section);
    }
    async findByCourse(req, res) {
        const courseId = Number(req.params.courseId);
        const sections = await this.service.findByCourse(courseId);
        res.json(sections);
    }
    async update(req, res) {
        const id = Number(req.params.id);
        const updatedSection = await this.service.update(id, req.body);
        res.json(updatedSection);
    }
    async delete(req, res) {
        const id = Number(req.params.id);
        const result = await this.service.delete(id);
        res.json(result);
    }
}
exports.SectionController = SectionController;
//# sourceMappingURL=section.controller.js.map