import { Router } from 'express';
import CategoryController from '../controllers/Category.controllers';

const CategoryRouter = Router();
CategoryRouter.post('/', CategoryController.create);
CategoryRouter.get('/', CategoryController.get);
CategoryRouter.get('/:id', CategoryController.getOne);
CategoryRouter.patch('/:id', CategoryController.update);
CategoryRouter.delete('/:id', CategoryController.delete);

export default CategoryRouter;
