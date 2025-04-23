import { TProfile } from '@/types/Profile.types';
import HTTP, { type TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Badge, Button, Divider, Input } from 'antd';
import Cookies from 'js-cookie';
import { FaHome, FaShoppingCart } from 'react-icons/fa';
import { FaRegFaceSmile } from 'react-icons/fa6';
import { IoSearchOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export function Header() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery<TResponse<TProfile>>({
    queryKey: ['me'],
    queryFn: async () => await HTTP.get('/auth/me'),
    enabled: !!Cookies.get('token'),
  });

  if (error) Cookies.remove('token');

  return (
    <div className='w-full h-16 py-2 flex items-center justify-center space-x-10'>
      <h1 className='text-2xl font-bold'>LOGO</h1>
      <Input.Search
        prefix={<IoSearchOutline className='mr-2' />}
        placeholder='Searching product...'
        allowClear
        enterButton='Search'
        size='large'
      />
      <div className='h-full flex items-center space-x-3 group/icon'>
        <Link to='/'>
          <Button icon={<FaHome className='inline mb-[3px] text-gray-600' size={18} />} size='large' type='text'>
            Home
          </Button>
        </Link>
        <Link to='/auth/login'>
          <Button
            loading={isLoading}
            icon={
              !user ? (
                <FaRegFaceSmile
                  className='inline mb-[3px] text-gray-600 group-hover/icon:text-primary duration-500'
                  size={18}
                />
              ) : (
                <Avatar size={25} src={user.metadata.avatar} />
              )
            }
            size='large'
          >
            {user?.metadata.user.username || 'Account'}
          </Button>
        </Link>
        <Divider type='vertical' style={{ height: '50%' }} />
        <Badge count={5} size='small' className='cursor-pointer'>
          <FaShoppingCart size={25} className='text-gray-600' />
        </Badge>
      </div>
    </div>
  );
}
