import { Router } from 'express';
import ProductController from '@modules/controller/ProductsController';

const productsRouter = Router();
const productsController = new ProductController();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.show);
productsRouter.post('/', productsController.create);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
