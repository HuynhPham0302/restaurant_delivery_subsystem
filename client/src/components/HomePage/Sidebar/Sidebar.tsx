import { TCategory } from '@/types/Category.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Divider } from 'antd';

export function Sidebar() {
  const { isLoading, data: Category } = useQuery<TResponse<TCategory[]>>({
    queryKey: ['category'],
    queryFn: async () => await HTTP.get('/category'),
  });

  return (
    <div className='h-screen w-full sticky top-4 bg-white rounded-md p-2'>
      <h1 className='font-medium text-[18px]'>Category</h1>
      <Divider className='my-2' />
      <div className='mt-4'>
        {Category?.metadata.map((category) => (
          <div
            className='p-2 flex items-center space-x-2 rounded-md hover:bg-gray-200 transition-colors duration-300 cursor-pointer'
            key={category.id}
          >
            <img src={category.image} alt={category.name} className='w-10 h-10' />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
