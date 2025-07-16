import { FastifyInstance } from 'fastify';
import { CreateProductController } from '../controller/product/createProductsController';
import { GetProductWhereIdController } from '../controller/product/getProductsWhereIdController';
import { GetProductController } from '../controller/product/getProductsController';
import { UpdateProductController } from '../controller/product/updateProductsController';
import { DeleteProductController } from '../controller/product/deleteProductsController';

export async function productRoutes(app: FastifyInstance) {
  const create = new CreateProductController();
  const get = new GetProductController();
  const getById = new GetProductWhereIdController();
  const update = new UpdateProductController();
  const del = new DeleteProductController();

  app.post('/product', create.store.bind(create));
  app.get('/product', get.index.bind(get));
  app.get('/product/:id', getById.show.bind(getById));
  app.put('/product/:id', update.handle.bind(update));
  app.delete('/product/:id', del.handle.bind(del));
}
