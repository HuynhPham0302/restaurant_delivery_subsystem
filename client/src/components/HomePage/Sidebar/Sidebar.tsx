import { TCategory } from '@/types/Category.types';
import { Divider } from 'antd';

export function Sidebar({ data }: { data: TCategory[] }) {
  return (
    <div className='h-screen w-full sticky top-4 bg-white rounded-md p-2'>
      <h1 className='font-medium text-[18px]'>Category</h1>
      <Divider className='my-2' />
      <div className='mt-4'>
        {data.map((category) => (
          <div
            className='p-2 flex items-center space-x-2 rounded-md hover:bg-gray-200 transition-colors duration-300 cursor-pointer'
            key={category.id}
          >
            <img src={category.image} alt={category.name} className='w-8 h-8' />
            <p className='text-sm'>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
