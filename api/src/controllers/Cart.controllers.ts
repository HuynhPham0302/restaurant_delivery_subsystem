import { Request, Response } from 'express';
import { CreateCartDto, CreateCartSchema } from '../dto/Cart.dto';
import CartServices from '../services/Cart.services';
import { ValidationData } from '../utils/Validation.utils';
import { dataFilter } from '../utils/Response.utils';

class CartControllers {
  async create(req: Request, res: Response) {
    const validate = await ValidationData<CreateCartDto>(req.body, CreateCartSchema);
    const response = await CartServices.create(validate);
    return res.status(response.status_code).json(response);
  }

  async get(req: Request, res: Response) {
    const { filter, query } = dataFilter(req.query);
    const response = await CartServices.get(filter, query);
    return res.status(response.status_code).json(response);
  }

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const response = await CartServices.getOne(id);
    return res.status(response.status_code).json(response);
  }

  async addItem(req: Request, res: Response) {
    const id = Number(req.params.id);
    const validate = await ValidationData<CreateCartDto>(req.body, CreateCartSchema);
    const response = await CartServices.addCartItem(id, validate);
    return res.status(response.status_code).json(response);
  }
}

export default new CartControllers();
