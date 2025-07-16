"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.petRoutes = petRoutes;
const createPetController_1 = require("../controller/pets/createPetController");
const updatePetController_1 = require("../controller/pets/updatePetController");
const deletePetController_1 = require("../controller/pets/deletePetController");
const getPetControoller_1 = require("../controller/pets/getPetControoller");
const getWhereIdPetControoller_1 = require("../controller/pets/getWhereIdPetControoller");
const getWhereIdClientPetControoller_1 = require("../controller/pets/getWhereIdClientPetControoller");
async function petRoutes(app) {
    const create = new createPetController_1.CreatePetController();
    const update = new updatePetController_1.UpdatePetController();
    const del = new deletePetController_1.DeletePetController();
    const get = new getPetControoller_1.GetPetController();
    const getById = new getWhereIdPetControoller_1.GetIdPetController();
    const getByClient = new getWhereIdClientPetControoller_1.getIdPetClientController();
    app.post('/pet', create.store.bind(create));
    app.get('/pet', get.handle.bind(get));
    app.put('/pet/:id', update.handle.bind(update));
    app.delete('/pet/:id', del.handle.bind(del));
    app.get('/pet/:id', getById.handle.bind(getById));
    app.get('/pet/client/:id', getByClient.handle.bind(getByClient));
}
