"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRoutes = companyRoutes;
const createCompanyController_1 = require("../controller/company/createCompanyController");
const getCompanyController_1 = require("../controller/company/getCompanyController");
const updateCompanyController_1 = require("../controller/company/updateCompanyController");
const deleteCompanyController_1 = require("../controller/company/deleteCompanyController");
const getCompanyWhereIdController_1 = require("../controller/company/getCompanyWhereIdController");
async function companyRoutes(app) {
    const create = new createCompanyController_1.CreateCompanyController();
    const getId = new getCompanyWhereIdController_1.GetCompanyWhereIdController();
    const get = new getCompanyController_1.GetCompanyController();
    const update = new updateCompanyController_1.UpdateCompanyController();
    const del = new deleteCompanyController_1.DeleteCompanyController();
    app.post('/company', create.store.bind(create));
    app.get('/company/:id', get.index.bind(getId));
    app.get('/company', get.index.bind(get));
    app.put('/company/:id', update.handle.bind(update));
    app.delete('/company/:id', del.handle.bind(del));
}
