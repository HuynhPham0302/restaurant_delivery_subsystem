import { TCart } from '@/types/Cart.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Badge } from 'antd';
import Cookies from 'js-cookie';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function CartIcon() {
  const cart_id = Cookies.get('cart_id');
  const { data: cart } = useQuery<TResponse<TCart>>({
    queryKey: ['cart'],
    queryFn: async () => await HTTP.GET(`/cart/${cart_id}`),
    enabled: cart_id ? true : false,
  });

  return (
    <Link to='/cart'>
      <Badge count={cart?.metadata.CartItem.length} size='small' className='cursor-pointer'>
        <FaShoppingCart size={25} className='text-gray-600' />
      </Badge>
    </Link>
  );
}
