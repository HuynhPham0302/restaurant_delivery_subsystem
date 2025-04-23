import { Router } from 'express';
import AuthRouter from './Auth.routers';
import CategoryRouter from './Category.routers';
import ProductRouter from './Product.routers';

const RootRouter = Router();

RootRouter.use('/auth', AuthRouter);
RootRouter.use('/category', CategoryRouter);
RootRouter.use('/product', ProductRouter);

export default RootRouter;
