"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRoutes = clientRoutes;
const createClientController_1 = require("../controller/clients/createClientController");
const getClientController_1 = require("../controller/clients/getClientController");
const updateClientController_1 = require("../controller/clients/updateClientController");
const deleteClientControllet_1 = require("../controller/clients/deleteClientControllet");
async function clientRoutes(app) {
    const create = new createClientController_1.ClientController();
    const get = new getClientController_1.GetClientController();
    const update = new updateClientController_1.UpdateClientController();
    const del = new deleteClientControllet_1.DeleteClientController();
    app.post('/client', create.store.bind(create));
    app.get('/client', get.index.bind(get));
    app.put('/client/:id', update.handle.bind(update));
    app.delete('/client/:id', del.handle.bind(del));
}
