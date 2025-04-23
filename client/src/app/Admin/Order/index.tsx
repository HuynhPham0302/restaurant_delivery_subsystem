import { TOrder } from '@/types/Order.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Button, Table } from 'antd';

const columns = [
  {
    title: 'idx',
    dataIndex: 'idx',
    key: 'Index',
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    render: (_, record) => (
      <div>
        <p>
          {record.fullName} - {record.phone_number}
        </p>
        <p>{record.email}</p>
      </div>
    ),
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    render: (product, record) => (
      <div>
        <p>{product} items</p>
        <p>${record.total_price}</p>
      </div>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <div className='space-x-2'>
        <Button size='small' disabled>
          Detail
        </Button>
      </div>
    ),
  },
];

export default function AdminOrder() {
  const { data: res, isLoading } = useQuery<TResponse<TOrder[]>>({
    queryKey: ['product'],
    queryFn: async () => await HTTP.GET(`/order`),
  });

  const dataSource = res?.metadata.map((order, idx) => ({
    idx: idx + 1,
    customer: order.fullName,
    product: order.OrderItem.length,
    ...order,
  }));

  return (
    <div>
      <h1 className='text-3xl font-bold'>Order:</h1>
      <Table loading={isLoading} bordered className='mt-4' dataSource={dataSource} columns={columns} />
    </div>
  );
}
