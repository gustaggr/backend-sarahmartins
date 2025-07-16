"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = categoryRoutes;
const createCategoryController_1 = require("../controller/categories/createCategoryController");
const getCategoryWhereIdController_1 = require("../controller/categories/getCategoryWhereIdController");
const getCategoryController_1 = require("../controller/categories/getCategoryController");
const updateCategoryController_1 = require("../controller/categories/updateCategoryController");
const deleteCategoryController_1 = require("../controller/categories/deleteCategoryController");
async function categoryRoutes(app) {
    const create = new createCategoryController_1.CreateCategoryController();
    const get = new getCategoryController_1.GetCategoryController();
    const getById = new getCategoryWhereIdController_1.GetCategoryWhereIdController();
    const update = new updateCategoryController_1.UpdateCategoryController();
    const del = new deleteCategoryController_1.DeleteCategoryController();
    app.post('/category', create.store.bind(create));
    app.get('/category', get.index.bind(get));
    app.get('/category/:id', getById.show.bind(getById));
    app.put('/category/:id', update.handle.bind(update));
    app.delete('/category/:id', del.handle.bind(del));
}
