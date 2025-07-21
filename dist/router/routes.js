"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = router;
const auth_routes_1 = require("./auth.routes");
const user_routes_1 = require("./user.routes");
const faq_routes_1 = require("./faq.routes");
const product_routes_1 = require("./product.routes");
const course_routes_1 = require("./course.routes");
const health_routes_1 = require("./health.routes");
const admin_1 = require("../middlewares/admin");
const recovery_routes_1 = require("./recovery.routes");
async function router(app) {
    // 🔓 Rotas públicas (não protegidas)
    await (0, health_routes_1.healthRoutes)(app);
    await (0, auth_routes_1.authRoutes)(app);
    await (0, recovery_routes_1.recoveryPassword)(app);
    // 🛡️ Rotas protegidas com escopo e middleware aplicado apenas nesse grupo
    app.register(async (protectedRoutes) => {
        protectedRoutes.addHook('onRequest', admin_1.AdminOrMasterKeyMiddleware);
        await (0, faq_routes_1.faqRoutes)(protectedRoutes);
        await (0, product_routes_1.productRoutes)(protectedRoutes);
        await (0, course_routes_1.courseRoutes)(protectedRoutes);
        await (0, user_routes_1.userRoutes)(protectedRoutes);
    });
}
