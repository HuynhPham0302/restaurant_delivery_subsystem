import { Router } from 'express';
import OrderController from '../controllers/Order.controllers';

const OrderRouter = Router();

OrderRouter.post('/', OrderController.create);
OrderRouter.get('/', OrderController.getAll);
OrderRouter.get('/:id', OrderController.getOne);
OrderRouter.patch('/:id', OrderController.update);

export default OrderRouter;
