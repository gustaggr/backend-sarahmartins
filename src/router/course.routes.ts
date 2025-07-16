import { FastifyInstance } from 'fastify';
import { CreateCourseController } from '../controller/course/createCourseController';
import { GetCourseWhereIdController } from '../controller/course/getCourseWhereIdController';
import { GetCourseController } from '../controller/course/getCourseController';
import { UpdateCourseController } from '../controller/course/updateCourseController';
import { DeleteCourseController } from '../controller/course/deleteCourseController';

export async function courseRoutes(app: FastifyInstance) {
  const create = new CreateCourseController();
  const get = new GetCourseController();
  const getById = new GetCourseWhereIdController();
  const update = new UpdateCourseController();
  const del = new DeleteCourseController();

  app.post('/course', create.store.bind(create));
  app.get('/course', get.index.bind(get));
  app.get('/course/:id', getById.show.bind(getById));
  app.put('/course/:id', update.handle.bind(update));
  app.delete('/course/:id', del.handle.bind(del));
}
