import { TProduct, TProduct_item } from '@/types/Product.types';
import { percentage } from '@/utils/Percentage.utils';
import { Card, Divider, Rate } from 'antd';
import { useMemo } from 'react';

export function ProductCard({ data }: { data: TProduct }) {
  const choiceItem = (item: TProduct_item[]) => {
    return item.reduce((max, item) => (item.is_discount && item.discount > max.discount ? item : max));
  };

  const ItemView = useMemo(() => choiceItem(data.items), [data.items]);

  return (
    <Card hoverable className='w-52 relative' cover={<img className='p-4' alt={data.name} src={data.images[0].url} />}>
      {ItemView.is_discount && (
        <span className='absolute top-4 right-4 bg-red-400/60 px-[4px] py-[2px] rounded-sm text-[12px]'>
          {' '}
          -{ItemView.discount}%
        </span>
      )}
      <p>{data.name}</p>
      <Rate defaultValue={5} disabled className='text-[12px] text-yellow-500' />
      <p className='text-base font-medium mt-2'>
        ${ItemView.is_discount ? ItemView.price - percentage(ItemView.price, ItemView.discount) : ItemView.price}
        {ItemView.is_discount && <span className='line-through text-sm text-gray-400 ml-1'>${ItemView.price}</span>}
      </p>
      <Divider className='my-2' />
      <p className='text-sm text-gray-300'>Line on!!!</p>
    </Card>
  );
}
