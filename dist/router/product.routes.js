"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = productRoutes;
const createProductController_1 = require("../controller/products/createProductController");
const getProductController_1 = require("../controller/products/getProductController");
const updateProductController_1 = require("../controller/products/updateProductController");
const deleteProductController_1 = require("../controller/products/deleteProductController");
async function productRoutes(app) {
    const create = new createProductController_1.CreateProductController();
    const get = new getProductController_1.GetProductController();
    const update = new updateProductController_1.UpdateProductController();
    const del = new deleteProductController_1.DeleteProductController();
    app.post('/product', create.store.bind(create));
    app.get('/product', get.index.bind(get));
    app.put('/product/:id', update.handle.bind(update));
    app.delete('/product/:id', del.handle.bind(del));
}
