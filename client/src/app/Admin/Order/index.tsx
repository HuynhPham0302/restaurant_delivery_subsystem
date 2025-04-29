/* eslint-disable @typescript-eslint/no-explicit-any */
import StatusTag from '@/components/StatusTag';
import { TOrder, TOrder_item } from '@/types/Order.types';
import { TProduct_item } from '@/types/Product.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Descriptions,
  DescriptionsProps,
  Divider,
  Modal,
  Select,
  Spin,
  Table,
  TableProps,
  message,
} from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import React from 'react';

export default function AdminOrder() {
  const [orderId, setOrderId] = useState<number | null>();
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const { data: res, isLoading } = useQuery<TResponse<TOrder[]>>({
    queryKey: ['order'],
    queryFn: async () => await HTTP.GET(`/order`),
  });

  const handleOpenDetail = (data: TOrder) => {
    setOrderId(data.id);
    setOpenDetail(true);
  };

  const columns: TableProps<any>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className='space-x-2'>
          <Button onClick={() => handleOpenDetail(record)} size='small' type='text'>
            Detail
          </Button>
        </div>
      ),
    },
  ];

  const dataSource = res?.metadata.map((order) => ({
    customer: order.fullName,
    product: order.OrderItem.length,
    ...order,
  }));

  return (
    <div>
      <h1 className='text-3xl font-bold'>Order:</h1>
      <Table loading={isLoading} bordered className='mt-4' dataSource={dataSource} columns={columns} />
      {orderId && <AdminOrderDetail order_id={orderId} open={openDetail} setOpen={setOpenDetail} />}
    </div>
  );
}

const AdminOrderDetail = ({
  order_id,
  open,
  setOpen,
}: {
  order_id: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [api, contextHolder] = message.useMessage();

  const { data, isLoading, error } = useQuery<TResponse<TOrder>>({
    queryKey: ['order', order_id],
    queryFn: async () => await HTTP.GET(`/order/${order_id}`),
    enabled: open,
  });

  const queryClient = useQueryClient();
  const calcPrice = (item: TProduct_item) =>
    item.is_discount ? item.price - (item.price * item.discount) / 100 : item.price;

  const handleChangeStatus = async (value: string) => {
    const update = await HTTP.PATCH<TResponse<TOrder>>(`/order/${order_id}`, { status: value });
    if (update.status_code === 200) {
      api.success('Update status success');
      queryClient.invalidateQueries({ queryKey: ['order', order_id] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
    } else {
      api.error('Update status failed');
    }
  };

  const statusSelect = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'delivering', label: 'Delivering' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const items: DescriptionsProps['items'] = [
    {
      key: 2,
      span: 4,
      label: 'Customer Info',
      children: (
        <div>
          <p>{data?.metadata.fullName + ' - ' + data?.metadata.phone_number}</p>
          <p>{data?.metadata.email}</p>
          <p>Address post: {data?.metadata.postal_code}</p>
        </div>
      ),
    },
    { key: 3, span: 4, label: 'Delivery Address', children: data?.metadata.address },
    {
      key: 6,
      span: 4,
      label: 'Status',
      children: (
        <Select onChange={handleChangeStatus} className='w-44' options={statusSelect} value={data?.metadata.status} />
      ),
    },
    { key: 4, span: 4, label: 'Total', children: '$' + data?.metadata.total_price },
    { key: 5, span: 4, label: 'Created At', children: dayjs(data?.metadata.createdAt).format('DD/MM/YYYY HH:mm') },
  ];

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Product',
      dataIndex: 'product_item',
      key: 'product_item',
      render: (item: TProduct_item) => (
        <div className='flex items-end space-x-2'>
          <img className='w-16 h-16 rounded-md' src={item.product.images[0].url} alt={item.id} />
          <div>
            <p>{item.product.name}</p>
            <p>{item.description}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity) => `x${quantity}`,
    },
    {
      title: 'Price',
      dataIndex: 'product_item',
      key: 'product_item',
      render: (item: TProduct_item) => '$' + calcPrice(item),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (_, record: TOrder_item) => '$' + record.quantity * calcPrice(record.product_item),
    },
  ];

  return (
    <Modal
      open={open}
      centered
      width={'80%'}
      onCancel={() => setOpen(false)}
      onOk={() => setOpen(false)}
      title={'Detail Order: ' + order_id}
    >
      {contextHolder}
      {isLoading && (
        <div className='w-full h-[30vh] flex items-center justify-center'>
          <Spin />
          <p>Loading ...</p>
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <>
          <h1 className='text-2xl font-bold'>Order information</h1>
          <Divider className='my-4' />
          <Descriptions size='small' bordered items={items} />
          <Divider className='my-4' />
          <h1 className='text-2xl font-bold'>Product information</h1>
          <Table className='mt-4' size='small' dataSource={data?.metadata.OrderItem} columns={columns} />
        </>
      )}
    </Modal>
  );
};
