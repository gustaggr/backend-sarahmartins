import { FastifyInstance } from 'fastify';

import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { faqRoutes } from './faq.routes';
import { productRoutes } from './product.routes';
import { courseRoutes } from './course.routes';

import { AdminOrMasterKeyMiddleware } from '../middlewares/admin';

export async function router(app: FastifyInstance) {
  // 🔓 Rotas públicas (não protegidas)
  await authRoutes(app);
  await faqRoutes(app);
  await productRoutes(app);
  await courseRoutes(app);

  // 🛡️ Rotas protegidas com escopo e middleware aplicado apenas nesse grupo
  app.register(async (protectedRoutes) => {
    protectedRoutes.addHook('onRequest', AdminOrMasterKeyMiddleware);

    await userRoutes(protectedRoutes);
  });
}
