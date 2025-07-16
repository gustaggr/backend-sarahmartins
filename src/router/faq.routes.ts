import { FastifyInstance } from 'fastify';
import { CreateFaqController } from '../controller/faq/createFaqController';
import { GetFaqWhereIdController } from '../controller/faq/getFaqWhereIdController';
import { GetFaqController } from '../controller/faq/getFaqController';
import { UpdateFaqController } from '../controller/faq/updateFaqController';
import { DeleteFaqController } from '../controller/faq/deleteFaqController';

export async function faqRoutes(app: FastifyInstance) {
  const create = new CreateFaqController();
  const get = new GetFaqController();
  const getById = new GetFaqWhereIdController();
  const update = new UpdateFaqController();
  const del = new DeleteFaqController();

  app.post('/faq', create.store.bind(create));
  app.get('/faq', get.index.bind(get));
  app.get('/faq/:id', getById.show.bind(getById));
  app.put('/faq/:id', update.handle.bind(update));
  app.delete('/faq/:id', del.handle.bind(del));
}
