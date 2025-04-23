/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

type TGoogleData = TResponse<{ token: string }>;

export function GoogleCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const url = `/auth/google/callback?code=${location.search.split('=')[1]}`;

  const { isError, data } = useQuery<TGoogleData>({
    queryKey: ['google'],
    queryFn: async () => await HTTP.GET(url),
  });

  if (isError) {
    console.error(data);
    navigate('/auth/login');
  }

  if (data) {
    console.log(data);
    Cookies.set('token', data.metadata.token, { expires: 7 });
    navigate('/');
  }

  return (
    <main className='w-full h-screen flex items-center justify-center flex-col space-y-6'>
      <Spin size='large' />
      <p className='text-xl font-medium'>Đang đăng nhập ...</p>
    </main>
  );
}
