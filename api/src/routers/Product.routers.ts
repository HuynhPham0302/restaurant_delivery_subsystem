import { Router } from 'express';
import ProductController from '../controllers/Product.controller';

const ProductRouter = Router();

ProductRouter.get('/', ProductController.get);
ProductRouter.get('/:id', ProductController.getOne);
ProductRouter.post('/', ProductController.create);
ProductRouter.patch('/:id', ProductController.update);
ProductRouter.delete('/:id', ProductController.delete);
ProductRouter.get('/search/name', ProductController.search);

export default ProductRouter;
