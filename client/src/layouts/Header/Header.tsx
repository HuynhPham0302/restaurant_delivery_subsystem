import { Badge, Button, Divider, Input } from 'antd';
import { FaShoppingCart } from 'react-icons/fa';
import { FaRegFaceSmile } from 'react-icons/fa6';
import { IoSearchOutline } from 'react-icons/io5';

export default function Header() {
  return (
    <div className='container mx-auto w-full h-14 flex items-center justify-center space-x-10'>
      <h1 className='text-2xl font-bold'>LOGO</h1>
      <Input.Search
        prefix={<IoSearchOutline className='mr-2' />}
        placeholder='Tìm kiếm các sản phẩm ...'
        allowClear
        enterButton='Tìm kiếm'
        size='large'
      />
      <div className='h-full flex items-center space-x-3 group/icon'>
        <Button
          icon={
            <FaRegFaceSmile
              className='inline mb-[3px] text-gray-600 group-hover/icon:text-blue-400 duration-500'
              size={18}
            />
          }
          size='large'
        >
          Đăng nhập
        </Button>
        <Divider type='vertical' style={{ height: '50%' }} />
        <Badge count={5} size='small' className='cursor-pointer'>
          <FaShoppingCart size={25} className='text-gray-600' />
        </Badge>
      </div>
    </div>
  );
}
