"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = productRoutes;
const createProductsController_1 = require("../controller/product/createProductsController");
const getProductsWhereIdController_1 = require("../controller/product/getProductsWhereIdController");
const getProductsController_1 = require("../controller/product/getProductsController");
const updateProductsController_1 = require("../controller/product/updateProductsController");
const deleteProductsController_1 = require("../controller/product/deleteProductsController");
async function productRoutes(app) {
    const create = new createProductsController_1.CreateProductController();
    const get = new getProductsController_1.GetProductController();
    const getById = new getProductsWhereIdController_1.GetProductWhereIdController();
    const update = new updateProductsController_1.UpdateProductController();
    const del = new deleteProductsController_1.DeleteProductController();
    app.post('/product', create.store.bind(create));
    app.get('/product', get.index.bind(get));
    app.get('/product/:id', getById.show.bind(getById));
    app.put('/product/:id', update.handle.bind(update));
    app.delete('/product/:id', del.handle.bind(del));
}
