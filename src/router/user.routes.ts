import { FastifyInstance } from 'fastify';
import { UserController } from '../controller/users/createUserController';
import { GetUserController } from '../controller/users/getUserController';
import { UpdateUserController } from '../controller/users/UpdateUserController';
import { DeleteUserController } from '../controller/users/DeleteUserController';

export async function userRoutes(app: FastifyInstance) {
  const create = new UserController();
  const get = new GetUserController();
  const update = new UpdateUserController();
  const del = new DeleteUserController();

  app.post('/register', create.store.bind(create));
  app.get('/user', get.index.bind(get));
  app.put('/user/:id', update.handle.bind(update));
  app.delete('/user/:id', del.handle.bind(del));
}
