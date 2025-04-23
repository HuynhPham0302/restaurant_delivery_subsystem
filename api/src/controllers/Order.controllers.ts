import { Request, Response } from 'express';
import { createOrderDto, createOrderSchema } from '../dto/Order.dto';
import { ValidationData } from '../utils/Validation.utils';
import OrderServices from '../services/Order.services';
import { dataFilter } from '../utils/Response.utils';

class OrderController {
  async create(req: Request, res: Response) {
    const validate = await ValidationData<createOrderDto>(req.body, createOrderSchema);
    const response = await OrderServices.create(validate);
    return res.status(response.status_code).json(response);
  }

  async getAll(req: Request, res: Response) {
    const { filter, query } = dataFilter(req.query);
    const response = await OrderServices.getAll(filter, query);
    return res.status(response.status_code).json(response);
  }

  async getOne(req: Request, res: Response) {
    const response = await OrderServices.getOne(Number(req.params.id));
    return res.status(response.status_code).json(response);
  }
}

export default new OrderController();
