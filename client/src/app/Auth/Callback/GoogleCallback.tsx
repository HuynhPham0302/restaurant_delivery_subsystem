/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import Cookies from 'js-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';

type TGoogleData = TResponse<{ token: string }>;

export function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  console.log();
  const url = `/auth/google/callback?code=${searchParams.get('code')}`;

  const { isError, data } = useQuery<TGoogleData>({
    queryKey: ['google'],
    queryFn: async () => await HTTP.GET(url),
  });

  console.log(data);

  if (isError) {
    console.error(data);
    navigate('/auth/login');
  }

  if (data) {
    console.log(data);
    Cookies.set('token', data.metadata.token, { expires: 7 });
    window.location.href = '/';
  }

  return (
    <main className='w-full h-screen flex items-center justify-center flex-col space-y-6'>
      <Spin size='large' />
      <p className='text-xl font-medium'>Đang đăng nhập ...</p>
    </main>
  );
}
