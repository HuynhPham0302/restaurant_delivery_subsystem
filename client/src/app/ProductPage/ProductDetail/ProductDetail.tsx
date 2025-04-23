import { BackIcon } from '@/components/BackIcon';
import { OptionSelection } from '@/components/OptionSelection';
import { Button, Col, Descriptions, DescriptionsProps, Divider, Radio, Row } from 'antd';
import { useState } from 'react';
import { BiSolidShoppingBagAlt } from 'react-icons/bi';
import type { Swiper as TSwiper } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { EffectFade, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const images = [
  'http://localhost:4000/v1/api/static/Sneaker_1.jpg',
  'http://localhost:4000/v1/api/static/Sneaker_2.jpg',
  'http://localhost:4000/v1/api/static/Sneaker_3.jpg',
  'http://localhost:4000/v1/api/static/Sneaker_4.jpg',
  'http://localhost:4000/v1/api/static/Sneaker_5.jpg',
  'http://localhost:4000/v1/api/static/Sneaker_6.jpg',
];

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    span: 24,
    label: 'UserName',
    children: <p>Zhou Maomao</p>,
  },
  {
    key: '2',
    span: 24,
    label: 'Telephone',
    children: <p>1810000000</p>,
  },
  {
    key: '3',
    span: 24,
    label: 'Live',
    children: <p>Hangzhou, Zhejiang</p>,
  },
  {
    key: '4',
    span: 24,
    label: 'Remark',
    children: <p>empty</p>,
  },
  {
    key: '5',
    span: 24,
    label: 'Address',
    children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
  },
];

export function ProductDetail() {
  const [thumbsSwiper, setThumbsSwiper] = useState<TSwiper | null>(null);
  return (
    <div className='container mx-auto py-20'>
      <BackIcon />
      <Row className='mt-10'>
        <Col span={12} className='relative'>
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
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    className='border border-solid border-gray-200 rounded-md'
                    width={600}
                    height={600}
                    src={image}
                    alt={`Sneaker ${index + 1}`}
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
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    className='border border-solid border-gray-200 rounded-md'
                    width={100}
                    height={100}
                    src={image}
                    alt={`Sneaker_thum ${index + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Col>
        <Col span={12}>
          <div className='space-y-3'>
            <h3 className='text-xl font-bold text-red-500'>Nike</h3>
            <h1 className='text-4xl font-extrabold'>Nike Zoom Vomero 5 - Anthracite</h1>
            <p className='text-gray-400'>SKU: 123456789</p>
            <p className='text-3xl font-bold text-red-500'>$200.00</p>
          </div>
          <div className='mt-32'>
            <OptionSelection />
          </div>
          <div className='mt-10'>
            <h3 className='uppercase font-bold text-xl text-gray-500'>Quantity</h3>
            <Radio.Group size='large' className='mt-4'>
              <Radio.Button>{'-'}</Radio.Button>
              <Radio.Button className='w-20 text-center'>1</Radio.Button>
              <Radio.Button>{'+'}</Radio.Button>
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
            <p className='mt-4 text-gray-400'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis sed ligula. Nullam sit amet
              libero nec nunc ultricies aliquam. Nullam sit amet libero nec nunc ultricies aliquam. Nullam sit amet
              libero nec nunc ultricies aliquam. Nullam sit amet libero nec nunc ultricies aliquam. Nullam sit amet
              libero nec nunc ultricies aliquam. Nullam sit amet libero nec nunc ultricies aliquam. Nullam sit amet
              libero nec nunc ultricies aliquam. Nullam sit amet libero nec nunc ultricies aliquam. Nullam sit amet
              libero nec nunc ultricies aliquam.
            </p>
          </div>
          <Divider />
          <Descriptions
            bordered
            className='mt-10'
            title={<h1 className='uppercase font-bold text-xl text-gray-500'>Information</h1>}
            items={items}
          />
        </Col>
      </Row>
    </div>
  );
}
