import { useState } from 'react';

const items = ['UK 40', 'UK 40.5', 'UK 41', 'UK 41.5', 'UK 42', 'UK 42.5', 'UK 43', 'UK 43.5'];

export function OptionSelection() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div>
      <div className='flex justify-between items-center mt-4'>
        <p className='uppercase font-bold text-xl text-gray-500'>Select Size</p>
      </div>
      <div>
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelected(item)}
            className={`${
              selected === item ? 'bg-black text-white' : 'bg-gray-200 text-black'
            } w-28 py-2 rounded-md mr-2 mt-4`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
