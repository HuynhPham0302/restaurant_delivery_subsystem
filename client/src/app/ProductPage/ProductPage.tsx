import { ProductCard } from '@/components/ProductCard';
import { TProduct } from '@/types/Product.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export function ProductPage() {
  const { data: res } = useQuery<TResponse<TProduct[]>>({
    queryKey: ['product'],
    queryFn: async () => await HTTP.GET(`/product`),
  });

  return (
    <div className='pt-20 container mx-auto'>
      <h1 className='text-3xl font-bold mt-4'>All Product:</h1>
      <div className='my-8'>
        {res?.metadata.map((product) => (
          <Link to={`/product/${product.slug}`} key={product.id}>
            <ProductCard data={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
