import { FastifyInstance } from 'fastify';
import { GetContentsController } from '../controller/assistant/getContentsController';

export async function contentRoutes(app: FastifyInstance) {
  const getContents = new GetContentsController();

  app.get('/contents', getContents.index.bind(getContents));
}
