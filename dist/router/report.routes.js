"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRoutes = reportRoutes;
const createReportsController_1 = require("../controller/reports/createReportsController");
const getReportsController_1 = require("../controller/reports/getReportsController");
const getNumberReportsController_1 = require("../controller/reports/getNumberReportsController");
const getVeterinariansController_1 = require("../controller/reports/getVeterinariansController");
const deleteReportController_1 = require("../controller/reports/deleteReportController");
async function reportRoutes(app) {
    const create = new createReportsController_1.CreateReportsController();
    const del = new deleteReportController_1.DeleteReportsController();
    const getAll = new getReportsController_1.GetReportsController();
    const getByNumber = new getNumberReportsController_1.GetNumberReportController();
    const getVets = new getVeterinariansController_1.GetVeterinariansController();
    app.delete('/report/:id', del.handle.bind(del));
    app.post('/report', create.store.bind(create));
    app.get('/reports', getAll.handle.bind(getAll));
    app.get('/report/:number', getByNumber.handle.bind(getByNumber));
    app.get('/veterinarians', getVets.handle.bind(getVets));
}
