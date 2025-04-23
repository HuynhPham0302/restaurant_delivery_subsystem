import { Sidebar } from '@/components/HomePage/Sidebar';
import { ProductCard } from '@/components/ProductCard';
import { TCategory } from '@/types/Category.types';
import { TProduct } from '@/types/Product.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';

export function HomePage() {
  const { isLoading: isCategoryLoading, data: Category } = useQuery<TResponse<TCategory[]>>({
    queryKey: ['category'],
    queryFn: async () => await HTTP.get('/category'),
  });

  const { isLoading: isProductLoading, data: Product } = useQuery<TResponse<TProduct[]>>({
    queryKey: ['product'],
    queryFn: async () => await HTTP.get('/product'),
  });

  return (
    <main className='container mx-auto'>
      <div className='flex space-x-4 mt-8'>
        <div className='w-[17%] relative'>
          <Sidebar data={Category?.metadata || []} />
        </div>
        <div className='flex-1 rounded-md space-y-4'>
          <div className='w-full h-32 rounded-md bg-white flex items-center space-x-10 p-4'>
            <div className='flex flex-col items-center'>
              <img
                src='https://salt.tikicdn.com/ts/upload/e0/4f/a4/2f79e4d3e8b4a71941fa7da279c994db.png'
                alt='image'
                className='w-14 h-14 border border-gray-100 rounded-md'
              />
              <p className='text-sm mt-2'>Top deals</p>
            </div>
            {Category?.metadata.map((category) => (
              <div key={category.id} className='flex flex-col items-center'>
                <img src={category.image} alt={category.name} className='w-14 h-14 border border-gray-100 rounded-md' />
                <p className='text-sm mt-2'>{category.name}</p>
              </div>
            ))}
          </div>
          <div className='w-full h-[200vh] bg-white rounded-md p-4'>
            <h1 className='text-xl font-bold text-primary'>Top Deals:</h1>
            <div className='mt-4'>
              {Product?.metadata.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
