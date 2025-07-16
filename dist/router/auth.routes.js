"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const loginUserController_1 = require("../controller/users/loginUserController");
const logoutUserController_1 = require("../controller/users/logoutUserController");
const admin_1 = require("../middlewares/admin");
async function authRoutes(app) {
    const auth = new loginUserController_1.AuthController();
    app.post('/login', auth.login.bind(auth));
    app.post('/logout', auth.logout.bind(auth));
    app.get('/me', auth.verifyToken.bind(auth));
    app.post('/force-clear-session', { preHandler: admin_1.AdminOrMasterKeyMiddleware }, logoutUserController_1.ForceClearSessionCookieController.clearSessionCookie);
}
