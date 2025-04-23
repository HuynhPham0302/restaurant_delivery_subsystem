import { Router } from 'express';
import CartController from '../controllers/Cart.controllers';

const CartRouter = Router();

CartRouter.get('/', CartController.get);
CartRouter.get('/:id', CartController.getOne);
CartRouter.post('/', CartController.create);
CartRouter.post('/:id', CartController.addItem);

export default CartRouter;
