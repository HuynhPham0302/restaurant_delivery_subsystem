import { Router } from 'express';
import AuthRouter from './Auth.routers';
import CartRouter from './Cart.routers';
import CategoryRouter from './Category.routers';
import OrderRouter from './Order.routers';
import ProductRouter from './Product.routers';
import StripeRouter from './Stripe.routers';

const RootRouter = Router();

RootRouter.use('/auth', AuthRouter);
RootRouter.use('/category', CategoryRouter);
RootRouter.use('/product', ProductRouter);
RootRouter.use('/cart', CartRouter);
RootRouter.use('/order', OrderRouter);
RootRouter.use('/stripe', StripeRouter);

export default RootRouter;
