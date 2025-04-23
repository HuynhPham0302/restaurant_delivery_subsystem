/* eslint-disable @typescript-eslint/no-explicit-any */
import { BackIcon } from '@/components/BackIcon';
import { OptionSelection } from '@/components/OptionSelection';
import { TProduct, TProduct_item } from '@/types/Product.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Button, Col, Descriptions, DescriptionsProps, Divider, Radio, Row, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { BiSolidShoppingBagAlt } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import type { Swiper as TSwiper } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { EffectFade, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [thumbsSwiper, setThumbsSwiper] = useState<TSwiper | null>(null);
  const [product_item, setProductItem] = useState<TProduct_item | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const key = `product_${slug}`;

  const { data: res } = useQuery<TResponse<TProduct[]>>({
    queryKey: [key],
    queryFn: async () => await HTTP.get(`/product?slug=${slug}`),
  });

  const product = useMemo(() => res?.metadata[0], [res]);

  useEffect(() => {
    if (product) {
      setProductItem(product.items.filter((item) => item.stock > 0)[0]);
    }
  }, [product]);

  const metaInfo = (meta: any): DescriptionsProps['items'] => {
    const items: DescriptionsProps['items'] = [];

    Object.entries(meta).forEach(([key, value]) => {
      items.push({
        key,
        span: 24,
        label: key,
        children: <p>{value as string}</p>,
      });
    });

    return items;
  };

  return (
    <div className='container mx-auto py-20'>
      <BackIcon />
      {product ? (
        <Row className='mt-10 relative'>
          <Col span={12}>
            <div className='sticky top-20'>
              <Swiper
                className='w-[600px] h-[600px]'
                style={
                  {
                    '--swiper-navigation-color': '#000',
                    '--swiper-pagination-color': '#000',
                  } as React.CSSProperties
                }
                navigation={true}
                effect={'fade'}
                pagination={{
                  clickable: true,
                }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[Navigation, Pagination, Thumbs, FreeMode, EffectFade]}
              >
                {product?.images.map((image) => (
                  <SwiperSlide key={image.id} className='select-none'>
                    <img
                      className='border border-solid border-gray-200 rounded-md'
                      width={600}
                      height={600}
                      src={image.url}
                      alt={`Sneaker ${image.id}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                className='mt-4 w-[600px]'
                onSwiper={setThumbsSwiper}
                spaceBetween={4}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
              >
                {product?.images.map((image) => (
                  <SwiperSlide key={image.id}>
                    <img
                      className='border border-solid border-gray-200 rounded-md'
                      width={100}
                      height={100}
                      src={image.url}
                      alt={`Sneaker_thum ${image.id}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Col>
          <Col span={12}>
            <div className='space-y-3'>
              <h3 className='text-xl font-bold text-red-500'>{product?.brand}</h3>
              <h1 className='text-4xl font-extrabold'>{product?.name}</h1>
              <p className='text-gray-400'>
                SKU: {product?.sku} - In Stock {product_item?.stock}
              </p>
              {product_item?.is_discount ? (
                <div className='flex items-center space-x-2'>
                  <p className='text-3xl font-bold text-red-500'>
                    ${product_item?.price - (product_item.price * product_item.discount) / 100}
                  </p>
                  <p className='text-gray-400 line-through text-2xl'>${product_item.price}</p>
                </div>
              ) : (
                <p className='text-3xl font-bold text-red-500'>${product_item?.price}</p>
              )}
            </div>
            <div className='mt-32'>
              <OptionSelection options={product.items} value={product_item} onChange={setProductItem} />
            </div>
            <div className='mt-10'>
              <h3 className='uppercase font-bold text-xl text-gray-500'>Quantity</h3>
              <Radio.Group size='large' className='mt-4'>
                <Radio.Button disabled={quantity <= 1} onClick={() => setQuantity((pre) => pre - 1)}>
                  {'-'}
                </Radio.Button>
                <Radio.Button className='w-20 text-center'>{quantity}</Radio.Button>
                <Radio.Button onClick={() => setQuantity((pre) => pre + 1)}>{'+'}</Radio.Button>
              </Radio.Group>
            </div>
            <Button
              size='large'
              type='primary'
              icon={<BiSolidShoppingBagAlt className='inline' />}
              className='uppercase text-2xl w-full mt-6 font-bold leading-3'
            >
              <span>Add to Bag</span>
            </Button>
            <Divider />
            <div>
              <h3 className='uppercase font-bold text-xl text-gray-500'>Description</h3>
              <p className='mt-4 text-gray-400'>{product?.description}</p>
            </div>
            <Divider />
            <Descriptions
              bordered
              className='mt-10'
              title={<h1 className='uppercase font-bold text-xl text-gray-500'>Information</h1>}
              items={metaInfo(product?.meta)}
            />
          </Col>
        </Row>
      ) : (
        <div className='flex flex-col space-y-2 items-center justify-center w-full h-screen'>
          <Spin />
          <p>Loading ...</p>
        </div>
      )}
    </div>
  );
}
