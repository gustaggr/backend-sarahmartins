import { FastifyInstance } from 'fastify';

import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { faqRoutes } from './faq.routes';
import { productRoutes } from './product.routes';
import { courseRoutes } from './course.routes';
import { healthRoutes } from './health.routes';
import { recoveryPassword } from './recovery.routes';

import { AdminOrMasterKeyMiddleware } from '../middlewares/admin';
import { clientRoutes } from './client.routes';
import { contentRoutes } from './content.routes';

export async function router(app: FastifyInstance) {
  // 🔓 Rotas públicas (sem autenticação)
  await app.register(async (publicRoutes) => {
    await healthRoutes(publicRoutes);
    await authRoutes(publicRoutes);
    await recoveryPassword(publicRoutes);
  });

  // 🛡️ Rotas protegidas (requer autenticação ou master key)
  await app.register(async (protectedRoutes) => {
    // Aplica middleware de autenticação para todas as rotas deste grupo
    protectedRoutes.addHook('onRequest', AdminOrMasterKeyMiddleware);
    
    await faqRoutes(protectedRoutes);
    await contentRoutes(protectedRoutes);
    await clientRoutes(protectedRoutes);
    await productRoutes(protectedRoutes);
    await courseRoutes(protectedRoutes);
    await userRoutes(protectedRoutes);
  });
}