import { Request, Response } from 'express';
import StripeService from '../services/Stripe.services';

class StripeController {
  async createPaymentIntent(req: Request, res: Response) {
    const response = await StripeService.createCheckoutSession(req.body);
    return res.status(200).json(response);
  }
}

export default new StripeController();
