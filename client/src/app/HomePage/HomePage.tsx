import { ProductCard } from '@/components/ProductCard';
import { TProduct } from '@/types/Product.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';
import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function HomePage() {
  const { data: products } = useQuery<TResponse<TProduct[]>>({
    queryKey: ['products'],
    queryFn: async () => await HTTP.get('/product'),
  });

  return (
    <div className='container mx-auto'>
      <Row className='w-full h-screen'>
        <Col span={12} className='mt-44'>
          <h1 className='text-[120px] font-bold leading-[120px] uppercase' style={{ fontFamily: 'Roboto' }}>
            Vomero 5
          </h1>
          <h2 className='text-7xl font-bold ml-2 uppercase' style={{ fontFamily: 'Roboto' }}>
            The thunder
          </h2>
          <p className='mt-32'>
            The Vomero 5 takes early-2000s running to modern heights. A combination of breathable and durable materials
            stands ready for the rigours of your day, while Zoom Air cushioning delivers a smooth ride.
          </p>
          <button className='px-6 py-4 bg-black text-white text-xl mt-10'>Shop now</button>
        </Col>
        <Col span={12} className='flex items-center justify-center w-full h-full'>
          <div
            className='w-[400px] h-[400px] rounded-full flex items-center justify-center'
            style={{ background: 'linear-gradient(140deg, rgba(29,29,29,1) 0%, rgba(172,172,172,1) 94%)' }}
          >
            <img
              className='-rotate-45 scale-125'
              src='http://localhost:4000/v1/api/static/sneaker_demo.png'
              alt='SNEAKER_DEMO'
            />
          </div>
        </Col>
      </Row>
      <div className='w-full'>
        <div className='flex justify-between items-end mt-4'>
          <p className='uppercase font-bold text-3xl'>New Collection</p>
          <p className='uppercase font-bold flex items-center text-gray-400 cursor-pointer group'>
            View All <FaAngleRight className='transition-transform group-hover:translate-x-1' />
          </p>
        </div>
        <Row className='mt-8' gutter={[85, 40]}>
          {products?.metadata.map((product) => (
            <Col key={product.id}>
              <Link to={`/product/${product.slug}`}>
                <ProductCard data={product} />
              </Link>
            </Col>
          ))}
        </Row>
      </div>
      <div className='py-36'>
        <p className='uppercase font-bold text-3xl my-4'>Featured Collection</p>
        <Row gutter={20} className='text-white'>
          <Col span={10} className='w-full h-[720px] relative rounded-sm overflow-hidden group cursor-pointer'>
            <img
              className='w-full h-full absolute top-0 left-0 group-hover:scale-105 transition-transform duration-500'
              src='http://localhost:4000/v1/api/static/Sneaker_brand.png'
              alt='SNEAKER_DEMO'
            />
            <div className='w-full h-full bg-black absolute top-0 left-0 opacity-60 group-hover:opacity-75 transition-opacity duration-500' />
            <div className='absolute bottom-14 left-10 text-2xl flex items-center'>
              <h1 className='font-extrabold uppercase'>All Product</h1>
              <FaAngleRight size={24} className='transition-transform group-hover:translate-x-3 duration-500' />
            </div>
          </Col>
          <Col span={14} className='space-y-3'>
            <div className='relative cursor-pointer w-full h-[354px] rounded-sm overflow-hidden group'>
              <img
                src='http://localhost:4000/v1/api/static/Sneaker_running.jpg'
                className='w-full h-full absolute top-0 left-0 group-hover:scale-105 transition-transform duration-500'
                alt='SNEAKER_Running'
              />
              <div className='w-full h-full bg-black absolute top-0 left-0 opacity-60 group-hover:opacity-75 transition-opacity duration-500' />
              <div className='absolute bottom-14 left-10 text-2xl flex items-center'>
                <h1 className='font-extrabold uppercase'>Running/Sport</h1>
                <FaAngleRight size={24} className='transition-transform group-hover:translate-x-3 duration-500' />
              </div>
            </div>
            <div className='relative cursor-pointer w-full h-[354px] rounded-sm overflow-hidden group'>
              <img
                src='http://localhost:4000/v1/api/static/Sneaker_basketball.JPG'
                className='w-full h-full absolute top-0 left-0 group-hover:scale-105 transition-transform duration-500'
                alt='SNEAKER_Running'
              />
              <div className='w-full h-full bg-black absolute top-0 left-0 opacity-60 group-hover:opacity-75 transition-opacity duration-500' />
              <div className='absolute bottom-14 left-10 text-2xl flex items-center'>
                <h1 className='font-extrabold uppercase'>Basketball Collection</h1>
                <FaAngleRight size={24} className='transition-transform group-hover:translate-x-3 duration-500' />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
