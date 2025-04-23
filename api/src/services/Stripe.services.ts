import Stripe from 'stripe';
import prismaInstance from '../configs/database.config';

class StripeService {
  private stripe: Stripe;
  private readonly successUrl = `${process.env.CLIENT_HOSTNAME}/checkout/success`;
  private readonly cancelUrl = `${process.env.CLIENT_HOSTNAME}/cart`;
  private prisma = prismaInstance.order;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'abc', {
      apiVersion: '2024-04-10',
    });
  }

  async createCheckoutSession(data: any) {
    const order = await this.prisma.findUnique({
      where: {
        id: data.order_id,
      },
      include: {
        OrderItem: {
          include: {
            product_item: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    const lineItems = order.OrderItem.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product_item.product.name + ' - ' + item.product_item.description,
          },
          unit_amount: item.product_item.is_discount
            ? (item.product_item.price - (item.product_item.price * item.product_item.discount) / 100) * 100
            : item.product_item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: this.successUrl,
      cancel_url: this.cancelUrl,
    });

    return session;
  }
}

export default new StripeService();
