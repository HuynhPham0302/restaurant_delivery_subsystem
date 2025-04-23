import { TProduct, TProduct_item } from '@/types/Product.types';

export function ProductCard({ data }: { data: TProduct }) {
  const choiceItemView = (): TProduct_item => {
    const itemsDiscount = data.items.filter((item) => item.is_discount);
    if (itemsDiscount.length > 0) {
      return itemsDiscount.reduce((max, item) => (item.discount > max.discount ? item : max));
    } else {
      return data.items.reduce((max, item) => (item.price > max.price ? item : max));
    }
  };

  return (
    <div>
      <div className='w-80 h-80 bg-gray-200 rounded flex items-center justify-center transition-shadow hover:shadow-2xl cursor-pointer group'>
        <img
          className='transition-transform w-80 scale-75 group-hover:scale-125 group-hover:-rotate-45 duration-500'
          src={data.image_cover}
          alt={data.name}
        />
      </div>
      <div className='mt-4'>
        <p className='font-bold text-black'>{data.brand}</p>
        <p className='text-black'>{data.name}</p>
        {choiceItemView().is_discount ? (
          <div className='text-red-600 flex items-end space-x-2'>
            <p className='block p-1 bg-red-300/50 rounded'>{choiceItemView().discount}%</p>
            <p className='text-2xl font-bold'>
              ${choiceItemView().price - (choiceItemView().price * choiceItemView().discount) / 100}
            </p>
            <p className='line-through leading-7 text-gray-500'>${choiceItemView().price}</p>
          </div>
        ) : (
          <p className='text-red-600 text-2xl font-bold'>${choiceItemView().price}</p>
        )}
      </div>
    </div>
  );
}
