import { TProduct, TProduct_item } from '@/types/Product.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Input } from 'antd';
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const choiceItemView = (data: TProduct): TProduct_item => {
    const itemsDiscount = data.items.filter((item) => item.is_discount);
    if (itemsDiscount.length > 0) {
      return itemsDiscount.reduce((max, item) => (item.discount > max.discount ? item : max));
    } else {
      return data.items.reduce((max, item) => (item.price > max.price ? item : max));
    }
  };

  const handleRedirect = (slug: string) => {
    navigate(`/product/${slug}`);
    setSearch('');
  };

  const { data: product } = useQuery<TResponse<TProduct[]>>({
    queryKey: ['search', search],
    queryFn: async () => await HTTP.GET(`/product/search/name?keyword=${search}`),
    enabled: !!search,
  });

  return (
    <div className='w-full relative'>
      <Input.Search
        prefix={<IoSearchOutline className='mr-2' />}
        placeholder='Searching product...'
        allowClear
        enterButton='Search'
        size='large'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {product && (
        <div className='absolute w-full max-h-[25vh] bg-white top-14 rounded-md z-30 p-4 cursor-pointer'>
          {product?.metadata.map((item) => (
            <div
              onClick={() => handleRedirect(item.slug)}
              key={item.id}
              className='flex p-2 border-b border-gray-200 space-x-4'
            >
              <img src={item.images[0].url} alt={item.name} className='w-20 h-20 object-cover rounded-md' />
              <div className='flex flex-col'>
                <p className='font-semibold'>{item.name}</p>
                {choiceItemView(item).is_discount ? (
                  <div className='flex space-x-1 items-end'>
                    <p className='line-through'>${choiceItemView(item).price}</p>
                    <p className='text-xl font-bold text-red-600'>
                      ${choiceItemView(item).price - (choiceItemView(item).price * choiceItemView(item).discount) / 100}
                    </p>
                  </div>
                ) : (
                  <p className='text-xl font-bold text-red-600'>${choiceItemView(item).price}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
