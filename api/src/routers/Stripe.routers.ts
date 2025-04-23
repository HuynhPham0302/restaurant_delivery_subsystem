import { Router } from 'express';
import StripeController from '../controllers/Stripe.controllers';

const StripeRouter = Router();

StripeRouter.post('/create-checkout-session', StripeController.createPaymentIntent);

export default StripeRouter;
