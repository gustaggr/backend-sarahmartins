"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = serviceRoutes;
const createServicesController_1 = require("../controller/services/createServicesController");
const getServicesController_1 = require("../controller/services/getServicesController");
const updateServicesController_1 = require("../controller/services/updateServicesController");
const deleteServicesController_1 = require("../controller/services/deleteServicesController");
async function serviceRoutes(app) {
    const create = new createServicesController_1.CreateServicesController();
    const get = new getServicesController_1.GetServicesController();
    const update = new updateServicesController_1.UpdateServiceConstroller();
    const del = new deleteServicesController_1.DeleteServicesController();
    app.post('/service', create.store.bind(create));
    app.get('/service', get.index.bind(get));
    app.put('/service/:id', update.handle.bind(update));
    app.delete('/service/:id', del.handle.bind(del));
}
