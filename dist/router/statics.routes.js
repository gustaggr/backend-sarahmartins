"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticsRoutes = staticsRoutes;
const getStaticsController_1 = require("../controller/statics/getStaticsController");
async function staticsRoutes(app) {
    const get = new getStaticsController_1.GetStaticsController();
    app.get('/statics', get.handle.bind(get));
}
