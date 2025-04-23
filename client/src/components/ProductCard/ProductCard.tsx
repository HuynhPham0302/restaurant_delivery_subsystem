export function ProductCard() {
  return (
    <div>
      <div className='w-80 h-80 bg-gray-200 rounded flex items-center justify-center transition-shadow hover:shadow-2xl cursor-pointer group'>
        <img
          className='transition-transform w-80 scale-75 group-hover:scale-125 group-hover:-rotate-45 duration-500'
          src='http://localhost:4000/v1/api/static/sneaker_demo.png'
          alt='SNEAKER_DEMO'
        />
      </div>
      <div className='mt-4'>
        <p className='font-bold'>NIKE</p>
        <p>Nike Zoom Vomero 5 - Anthracite</p>
        <p className='text-primary font-bold text-xl'>$160</p>
      </div>
    </div>
  );
}
