import { TCategory } from '@/types/Category.types';
import { TOrder } from '@/types/Order.types';
import { TProduct } from '@/types/Product.types';
import { TUser } from '@/types/User.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Col, Divider, Row } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

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
        label: '# of Votes',
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
            <h2 className='text-2xl font-bold'>Total User activate: {user?.metadata.length} User</h2>
            <h2 className='text-2xl font-bold'>Total Product: {product?.metadata.length} product</h2>
            <h2 className='text-2xl font-bold'>Total Order: {order?.metadata.length} Order</h2>
            <h2 className='text-2xl font-bold'>
              Total order completed:{' '}
              {order?.metadata.reduce((count, order) => {
                if (order.status === 'completed') count++;
                return count;
              }, 0)}{' '}
              Order
            </h2>
            <h2 className='text-2xl font-bold'>
              Total Revenue:{' '}
              {order?.metadata.reduce((revenue, order) => {
                revenue += order.total_price;
                return revenue;
              }, 0)}
              $
            </h2>
          </div>
          <Divider />
          <h1 className='text-3xl font-bold mt-20'>Website Traffic</h1>
          <div className='mt-10'>
            <h2 className='text-2xl font-bold'>Website visits / day: 328 times</h2>
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
