import { TCategory } from '@/types/Category.types';
import { TOrder } from '@/types/Order.types';
import { TProduct } from '@/types/Product.types';
import { TUser } from '@/types/User.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Card, Col, Divider, Row } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { BiCategory, BiSolidUser } from 'react-icons/bi';
import { FaCheckDouble } from 'react-icons/fa';
import { GoPaperclip } from 'react-icons/go';
import { IoLogoUsd, IoMdCart } from 'react-icons/io';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatisticalReport() {
  const { data: product } = useQuery<TResponse<TProduct[]>>({
    queryKey: ['product'],
    queryFn: async () => await HTTP.GET(`/product`),
  });

  const { data: user } = useQuery<TResponse<TUser[]>>({
    queryKey: ['user'],
    queryFn: async () => await HTTP.GET(`/auth/user`),
  });

  const { data: order } = useQuery<TResponse<TOrder[]>>({
    queryKey: ['order'],
    queryFn: async () => await HTTP.GET(`/order`),
  });

  const { data: category } = useQuery<TResponse<TCategory[]>>({
    queryKey: ['category'],
    queryFn: async () => await HTTP.GET(`/category`),
  });

  const data = {
    labels: category?.metadata.map((item) => item.name),
    datasets: [
      {
        label: 'Product in Category',
        data: category?.metadata.map((item) => item.Product.length),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section>
      <h1 className='text-3xl font-bold'>Statistical Report</h1>
      <Divider />
      <Row className='mt-10'>
        <Col span={14}>
          <div className='grid grid-cols-2 gap-20'>
            <CardStatistical
              title='Total User'
              value={user?.metadata.length}
              icon={<BiSolidUser size={20} />}
              description='Total User activate'
              color='blue'
            />
            <CardStatistical
              title='Total Product'
              value={product?.metadata.length}
              icon={<IoMdCart size={20} />}
              description='Total Product in store'
              color='green'
            />

            <CardStatistical
              title='Total Order'
              value={order?.metadata.length}
              icon={<GoPaperclip size={20} />}
              description='Total Order in store'
              color='red'
            />
            <CardStatistical
              title='Total Category'
              value={category?.metadata.length}
              icon={<BiCategory size={20} />}
              description='Total Category in store'
              color='purple'
            />

            <CardStatistical
              title='Total Order Completed'
              value={order?.metadata.reduce((count, order) => {
                if (order.status === 'completed') count++;
                return count;
              }, 0)}
              icon={<FaCheckDouble size={20} />}
              description='Total Order completed in store'
              color='orange'
            />

            <CardStatistical
              title='Total Revenue'
              value={order?.metadata.reduce((revenue, order) => {
                revenue += order.total_price;
                return revenue;
              }, 0)}
              icon={<IoLogoUsd size={20} />}
              description='Total Revenue in store'
              color='yellow'
            />
          </div>
          <Divider />
          <h1 className='text-3xl font-bold mt-20'>Website Traffic</h1>
          <div className='mt-10'>
            <CardStatistical
              title='Total Visitor'
              value={32}
              icon={<BiSolidUser size={20} />}
              description='Total Visitor in store / day'
              color='blue'
            />
          </div>
        </Col>
        <Col span={10}>
          <h1 className='text-2xl font-bold text-center'>Product in Category</h1>
          <div className='w-full h-[450px] flex items-center justify-center'>
            <Pie
              options={{
                responsive: true,
                layout: {
                  padding: 20,
                },
              }}
              data={data}
            />
          </div>
        </Col>
      </Row>
    </section>
  );
}

const CardStatistical = ({
  title,
  value,
  icon,
  description,
  color,
}: {
  title: string;
  value: number | undefined;
  description?: string;
  icon: React.ReactNode;
  color: string;
}) => {
  return (
    <Card className='relative shadow-lg shadow-slate-200'>
      <div className='flex justify-end '>
        <div className='space-y-2'>
          <p className='text-xl font-bold'>{title}</p>
          <p className='text-end text-xl'>{value}</p>
        </div>
        <div
          style={{ background: color, color: 'white' }}
          className='absolute -top-5 left-5 w-14 h-14 flex items-center justify-center rounded-lg'
        >
          {icon}
        </div>
      </div>
      <p>{description}</p>
    </Card>
  );
};
