// src/routes/authRoutes.ts
import { FastifyInstance } from 'fastify';
import { ResetPasswordWithTokenController, SendResetLinkController } from '../controller/recovery/passwordResetController';
import { verifyResetTokenHandler } from '../controller/recovery/verifyResetTokenHandler';

export async function recoveryPassword(app: FastifyInstance) {
  const sendResetLink = new SendResetLinkController();
  const resetPassword = new ResetPasswordWithTokenController();

  app.post('/forgot-password', sendResetLink.handle.bind(sendResetLink));  // Envia link de reset
  app.post('/reset-password', resetPassword.handle.bind(resetPassword));   // Redefine senha via token
  app.get('/reset-password/verify', verifyResetTokenHandler);
}
