/* eslint-disable react-hooks/exhaustive-deps */
import { TProduct_item } from '@/types/Product.types';

export function OptionSelection({
  options,
  value,
  onChange,
}: {
  options: TProduct_item[];
  value: TProduct_item | null;
  onChange: (item: TProduct_item) => void;
}) {
  return (
    <div>
      <div className='flex justify-between items-center mt-4'>
        <p className='uppercase font-bold text-xl text-gray-500'>Select Size</p>
      </div>
      <div className='flex flex-wrap'>
        {options.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item)}
            disabled={item.stock === 0}
            className={`${value?.id === item.id ? 'bg-black text-white' : 'bg-gray-200 text-black'} ${
              item.stock === 0 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : ''
            } w-36 rounded-md mr-2 mt-4 h-10`}
          >
            {item.stock === 0 ? (
              <p>
                <span className='block text-sm'>{item.description}</span>
                <span className='block text-sm'>Out of stock</span>
              </p>
            ) : item.is_discount ? (
              <p>
                {item.description} <span className='text-gray-300'>{item.discount}% Off</span>
              </p>
            ) : (
              <p>{item.description}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
