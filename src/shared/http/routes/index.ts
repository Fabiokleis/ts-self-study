import productsRouter from '@modules/routes/products.routes';
import { Router, response } from 'express';

const routes = Router();

routes.use('/products', productsRouter);

export default routes;
