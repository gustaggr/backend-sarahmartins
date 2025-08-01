import { FastifyInstance } from 'fastify';
import { DeleteClientController } from '../controller/clients/deleteClientController';
import { CreateClientController } from '../controller/clients/createClientController';
import { GetClientController } from '../controller/clients/getClientController';
import { GetClientWhereIdController } from '../controller/clients/getClientWhereIdController';
import { UpdateClientController } from '../controller/clients/updateClientController';

export async function clientRoutes(app: FastifyInstance) {
  const create = new CreateClientController();
  const get = new GetClientController();
  const getById = new GetClientWhereIdController();
  const update = new UpdateClientController();
  const del = new DeleteClientController();

  app.post('/client', create.store.bind(create));
  app.get('/client', get.index.bind(get));
  app.get('/client/:id', getById.show.bind(getById));
  app.put('/client/:id', update.handle.bind(update));
  app.delete('/client/:id', del.handle.bind(del));
}
