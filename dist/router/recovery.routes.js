"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoveryPassword = recoveryPassword;
const passwordResetController_1 = require("../controller/recovery/passwordResetController");
const verifyResetTokenHandler_1 = require("../controller/recovery/verifyResetTokenHandler");
async function recoveryPassword(app) {
    const sendResetLink = new passwordResetController_1.SendResetLinkController();
    const resetPassword = new passwordResetController_1.ResetPasswordWithTokenController();
    app.post('/forgot-password', sendResetLink.handle.bind(sendResetLink)); // Envia link de reset
    app.post('/reset-password', resetPassword.handle.bind(resetPassword)); // Redefine senha via token
    app.get('/reset-password/verify', verifyResetTokenHandler_1.verifyResetTokenHandler);
}
