"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitController = void 0;
const visit_service_1 = require("./visit.service");
const service = new visit_service_1.VisitService();
class VisitController {
    async getAll(req, res, next) {
        try {
            const visits = await service.getAll();
            res.json(visits);
        }
        catch (err) {
            next(err);
        }
    }
    async getAllMock(req, res, next) {
        try {
            const visits = await service.getAllMock();
            res.json(visits);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.VisitController = VisitController;
//# sourceMappingURL=visit.controller.js.map