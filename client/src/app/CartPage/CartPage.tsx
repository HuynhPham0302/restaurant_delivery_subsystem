/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCart } from '@/types/Cart.types';
import { TProduct_item } from '@/types/Product.types';
import { TProfile } from '@/types/Profile.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Button, Col, Divider, Empty, Form, Row } from 'antd';
import Cookies from 'js-cookie';
import { useState } from 'react';

const priceCalc = (item: TProduct_item): number => {
  if (item.is_discount) {
    return item.price - (item.price * item.discount) / 100;
  } else {
    return item.price;
  }
};

export default function CartPage() {
  const cart_id = Cookies.get('cart_id');
  const [loading, setLoading] = useState<boolean>(false);
  const { data: cart } = useQuery<TResponse<TCart>>({
    queryKey: ['cart'],
    queryFn: async () => await HTTP.GET(`/cart/${cart_id}`),
    enabled: cart_id ? true : false,
  });

  const { data: user } = useQuery<TResponse<TProfile>>({
    queryKey: ['me'],
    queryFn: async () => await HTTP.GET('/auth/me'),
    enabled: !!Cookies.get('token'),
  });

  if (cart_id && !cart)
    return (
      <div>
        <Empty description='Cart is empty' />
      </div>
    );

  const handleCheckout = async (value: any) => {
    setLoading(true);
    value.products = cart?.metadata.CartItem.map((item) => ({
      product_item_id: item.product_item.id,
      quantity: item.quantity,
    }));

    value.total_price = cart?.metadata.CartItem.reduce(
      (acc, item) => acc + priceCalc(item.product_item) * item.quantity,
      0,
    );

    value.address = `${value.address_1}, ${value.address_2}, ${value.address_3}`;
    value.user_id = user?.metadata.id;

    const createOrder = await HTTP.POST<any>('/order', value);

    if (createOrder.status_code === 201) {
      const checkout = await HTTP.POST<any>('/stripe/create-checkout-session', {
        order_id: createOrder.metadata.id,
      });
      window.location.href = checkout.url;
    }
  };

  return (
    <div className='pt-20 container mx-auto'>
      <h1 className='text-3xl font-bold'>Shopping Bag</h1>
      <h3 className='font-bold mt-2'>{cart?.metadata.CartItem.length} items in your bag!</h3>
      <Row gutter={20} className='my-6 w-full'>
        <Col span={16}>
          <div className='w-full p-6 bg-white rounded-md'>
            <div className='flex font-bold w-full'>
              <p className='w-1/2'>Product</p>
              <p className='w-[16%]'>Price</p>
              <p className='w-[16%]'>Quantity</p>
              <p className='flex-1'>Total</p>
            </div>
            <Divider className='my-2' />
            {cart?.metadata.CartItem.map((item) => (
              <div key={item.id} className='w-full'>
                <div className='flex my-2 w-full'>
                  <div className='w-1/2 flex space-x-4'>
                    <img
                      className='w-36 rounded-md overflow-hidden'
                      src={item.product_item.product.images[0].url}
                      alt={item.product_item.product.name}
                    />
                    <div className='flex-1 space-y-1'>
                      <p className='font-bold text-red-600'>{item.product_item.product.brand}</p>
                      <p className='font-bold'>{item.product_item.product.name}</p>
                      <p>Size: {item.product_item.description}</p>
                    </div>
                  </div>
                  <div className='w-[16%]'>
                    <p>${priceCalc(item.product_item)}</p>
                  </div>
                  <div className='w-[16%]'>
                    <p>{item.quantity}</p>
                  </div>
                  <div className='flex-1 text-yellow-600 font-bold'>
                    <p>${priceCalc(item.product_item) * item.quantity}</p>
                  </div>
                </div>
                <Divider className='my-2' />
              </div>
            ))}
          </div>
        </Col>
        <Col span={8}>
          <Form onFinish={handleCheckout} layout='vertical' className='space-y-3'>
            <div className='w-full bg-white rounded-md p-4'>
              <h1 className='text-2xl font-bold'>Delivery address:</h1>
              <Divider />
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Full Name is required',
                  },
                ]}
                label='Full Name'
                name='fullName'
              >
                <input type='text' className='w-full border p-2 rounded-md' />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Email is required',
                  },
                  {
                    type: 'email',
                    message: 'Invalid email address',
                  },
                ]}
                label='Email'
                name='email'
              >
                <input type='text' className='w-full border p-2 rounded-md' />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Phone Number is required',
                  },
                  {
                    pattern: new RegExp(/^[0-9\b]+$/),
                    message: 'Invalid phone number',
                  },
                ]}
                label='Phone Number'
                name='phone'
              >
                <input type='text' className='w-full border p-2 rounded-md' />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Address is required',
                  },
                ]}
                label='Address'
                name='address_1'
              >
                <input type='text' className='w-full border p-2 rounded-md' />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Address is required',
                  },
                ]}
                label='City'
                name='address_2'
              >
                <input type='text' className='w-full border p-2 rounded-md' />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Address is required',
                  },
                ]}
                label='Country'
                name='address_3'
              >
                <input type='text' className='w-full border p-2 rounded-md' />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Postal Code is required',
                  },
                ]}
                label='Postal Code'
                name='postal_code'
              >
                <input type='text' className='w-full border p-2 rounded-md' />
              </Form.Item>
            </div>
            <div className='w-full bg-white rounded-md p-4'>
              <h1 className='text-2xl font-bold'>Order Summary:</h1>
              <Divider />
              <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>
                  $
                  {cart?.metadata.CartItem.reduce((acc, item) => acc + priceCalc(item.product_item) * item.quantity, 0)}
                </p>
              </div>
              <Divider />
              <div className='flex justify-between'>
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <Divider />
              <div className='flex justify-between'>
                <p>Total</p>
                <p>
                  $
                  {cart?.metadata.CartItem.reduce((acc, item) => acc + priceCalc(item.product_item) * item.quantity, 0)}
                </p>
              </div>
              <Divider />
              <Button
                disabled={loading}
                loading={loading}
                htmlType='submit'
                className='w-full'
                size='large'
                type='primary'
              >
                Proceed to checkout
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
