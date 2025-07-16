"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqRoutes = faqRoutes;
const createFaqController_1 = require("../controller/faq/createFaqController");
const getFaqWhereIdController_1 = require("../controller/faq/getFaqWhereIdController");
const getFaqController_1 = require("../controller/faq/getFaqController");
const updateFaqController_1 = require("../controller/faq/updateFaqController");
const deleteFaqController_1 = require("../controller/faq/deleteFaqController");
async function faqRoutes(app) {
    const create = new createFaqController_1.CreateFaqController();
    const get = new getFaqController_1.GetFaqController();
    const getById = new getFaqWhereIdController_1.GetFaqWhereIdController();
    const update = new updateFaqController_1.UpdateFaqController();
    const del = new deleteFaqController_1.DeleteFaqController();
    app.post('/faq', create.store.bind(create));
    app.get('/faq', get.index.bind(get));
    app.get('/faq/:id', getById.show.bind(getById));
    app.put('/faq/:id', update.handle.bind(update));
    app.delete('/faq/:id', del.handle.bind(del));
}
