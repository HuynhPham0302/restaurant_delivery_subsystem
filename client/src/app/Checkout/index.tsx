import { Button, Result } from 'antd';
import Cookies from 'js-cookie';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CheckOut() {
  Cookies.remove('cart_id');
  return (
    <div className='flex w-full h-screen items-center justify-center'>
      <Result
        status='success'
        icon={<FaCheckCircle className='text-8xl inline text-green-600' />}
        title='Successfully Purchased'
        subTitle='Thank you for your order. We will send you an email with the order details.'
        extra={[
          <Link to='/'>
            <Button type='primary' key='console'>
              Go Console
            </Button>
          </Link>,
        ]}
      />
    </div>
  );
}
