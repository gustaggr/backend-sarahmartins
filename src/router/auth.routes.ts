import { FastifyInstance } from 'fastify';
import { AuthController } from '../controller/users/loginUserController';
import { ForceClearSessionCookieController } from '../controller/users/logoutUserController';
import { AdminOrMasterKeyMiddleware } from '../middlewares/admin';

export async function authRoutes(app: FastifyInstance) {
    const auth = new AuthController();

    app.post('/login', auth.login.bind(auth));

    app.post('/logout', auth.logout.bind(auth));
    app.get('/me', auth.verifyToken.bind(auth));
    app.post('/force-clear-session',
        { preHandler: AdminOrMasterKeyMiddleware },
        ForceClearSessionCookieController.clearSessionCookie
    );
}
