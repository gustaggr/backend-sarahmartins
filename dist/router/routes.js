"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = router;
const auth_routes_1 = require("./auth.routes");
const user_routes_1 = require("./user.routes");
const client_routes_1 = require("./client.routes");
const pet_routes_1 = require("./pet.routes");
const category_routes_1 = require("./category.routes");
const product_routes_1 = require("./product.routes");
const service_routes_1 = require("./service.routes");
const report_routes_1 = require("./report.routes");
const statics_routes_1 = require("./statics.routes");
const health_routes_1 = require("./health.routes");
const admin_1 = require("../middlewares/admin");
const company_routes_1 = require("./company.routes");
async function router(app) {
    // 🔓 Rotas públicas (não protegidas)
    await (0, auth_routes_1.authRoutes)(app);
    await (0, health_routes_1.healthRoutes)(app);
    // 🛡️ Rotas protegidas com escopo e middleware aplicado apenas nesse grupo
    app.register(async (protectedRoutes) => {
        protectedRoutes.addHook('onRequest', admin_1.AdminOrMasterKeyMiddleware);
        await (0, company_routes_1.companyRoutes)(protectedRoutes);
        await (0, user_routes_1.userRoutes)(protectedRoutes);
        await (0, client_routes_1.clientRoutes)(protectedRoutes);
        await (0, pet_routes_1.petRoutes)(protectedRoutes);
        await (0, category_routes_1.categoryRoutes)(protectedRoutes);
        await (0, product_routes_1.productRoutes)(protectedRoutes);
        await (0, service_routes_1.serviceRoutes)(protectedRoutes);
        await (0, report_routes_1.reportRoutes)(protectedRoutes);
        await (0, statics_routes_1.staticsRoutes)(protectedRoutes);
    });
}
