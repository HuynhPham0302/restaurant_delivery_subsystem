/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProfile } from '@/types/Profile.types';
import HTTP from '@/utils/Http.utils';
import { TResponse } from '@/utils/TRes.utils';
import { Button, Col, Divider, Form, Input, Row, notification } from 'antd';
import { Rule } from 'antd/es/form';
import Cookies from 'js-cookie';
import { FaGoogle } from 'react-icons/fa';
import { MdAlternateEmail, MdOutlinePassword } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

class VALIDATE {
  static EMAIL: Rule[] = [
    { required: true, message: 'Vui lòng nhập email!' },
    { type: 'email', message: 'Email không hợp lệ!' },
  ];
  static PASSWORD: Rule[] = [
    { required: true, message: 'Vui lòng nhập mật khẩu!' },
    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
  ];
}

type LoginProps = {
  email: string;
  password: string;
};

type TProfileLogin = TResponse<TProfile & { token: string }>;

export function Login() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const GoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/v1/api/auth/google`;
  };

  const handleSubmit = async (values: LoginProps) => {
    try {
      const { data } = await HTTP.post<TProfileLogin>('/auth/login', values);
      api.success({
        message: 'Đăng nhập thành công!',
        description: `Chào mừng ${data.metadata.user.username} quay trở lại!`,
      });
      setTimeout(() => {
        navigate('/');
        Cookies.set('token', data.metadata.token, { expires: 7 });
      }, 1400);
    } catch (error: any) {
      console.error(error);
      api.error({
        message: 'Đăng nhập thất bại!',
        description: error.response.data.message,
      });
    }
  };

  return (
    <main className='w-full h-screen flex items-center justify-center bg-secondary/30'>
      {contextHolder}
      <Row className='w-1/2 h-1/2 bg-white rounded-lg shadow-xl overflow-hidden'>
        <Col span={16} className='p-8'>
          <h1 className='text-3xl font-medium'>Xin chào!</h1>
          <h4 className='text-base mt-3'>Đăng nhập hoặc đăng ký tài khoản mới!</h4>
          <div className='mt-4'>
            <Form onFinish={handleSubmit} layout='vertical' requiredMark={false}>
              <Form.Item label='Email:' name='email' rules={VALIDATE.EMAIL}>
                <Input size='large' prefix={<MdAlternateEmail className='text-gray-500' />} />
              </Form.Item>
              <Form.Item label='Mật khẩu:' name='password' rules={VALIDATE.PASSWORD}>
                <Input.Password size='large' prefix={<MdOutlinePassword className='text-gray-500' />} />
              </Form.Item>
              <Button htmlType='submit' className='w-full mt-4' size='large' type='primary'>
                Đăng nhập
              </Button>
            </Form>
            <Divider>
              <p className='text-gray-400'>Hoặc</p>
            </Divider>
            <div
              onClick={GoogleLogin}
              className='w-full h-14 bg-secondary/60 rounded-lg shadow-md flex items-center cursor-pointer px-6 group/button'
            >
              <FaGoogle size={20} className='text-gray-500 group-hover/button:text-primary transition-colors' />
              <p className='text-gray-500 ml-4 group-hover/button:text-primary transition-colors'>
                Đăng nhập với Google
              </p>
            </div>
          </div>
        </Col>
        <Col span={8} className='bg-secondary/80'></Col>
      </Row>
    </main>
  );
}
