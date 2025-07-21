import { FastifyInstance } from 'fastify';

import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { faqRoutes } from './faq.routes';
import { productRoutes } from './product.routes';
import { courseRoutes } from './course.routes';
import { healthRoutes } from './health.routes';

import { AdminOrMasterKeyMiddleware } from '../middlewares/admin';
import { recoveryPassword } from './recovery.routes';

export async function router(app: FastifyInstance) {
  // 🔓 Rotas públicas (não protegidas)
  await healthRoutes(app);
  await authRoutes(app);
  await recoveryPassword(app);


  // 🛡️ Rotas protegidas com escopo e middleware aplicado apenas nesse grupo
  app.register(async (protectedRoutes) => {
    protectedRoutes.addHook('onRequest', AdminOrMasterKeyMiddleware);
    await faqRoutes(protectedRoutes);
    await productRoutes(protectedRoutes);
    await courseRoutes(protectedRoutes);
    await userRoutes(protectedRoutes);
  });
}
