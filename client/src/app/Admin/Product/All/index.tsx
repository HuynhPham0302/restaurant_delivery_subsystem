/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProduct } from '@/types/Product.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { Button, Table, TableProps } from 'antd';
import qs from 'qs';

export default function AdminAllProduct() {
  const queryClient = new QueryClient();
  let page = 1;
  const { data: res, isFetching } = useQuery<TResponse<TProduct[]>>({
    queryKey: ['product'],
    queryFn: async () => await HTTP.GET(`/product?${qs.stringify({ page, limit: 10, sort: 'asc', order: 'id' })}`),
  });

  console.log(res);

  const handleChangePage = (changePage: number) => {
    page = changePage;
    queryClient.invalidateQueries({ queryKey: ['product'] });
  };

  const columns: TableProps<any>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (_, record: TProduct) => (
        <div className='flex space-x-2'>
          <img src={record.image_cover} alt={record.name} className='w-24' />
          <div>
            <p>{record.name}</p>
            <p>{record.sku}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <p>{category.name}</p>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record: TProduct) => (
        <div className='flex space-x-2'>
          <Button size='small' type='primary'>
            Edit
          </Button>
          <Button size='small' danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <section>
      <h1 className='text-2xl font-bold'>All Product</h1>
      <Table
        className='mt-4'
        columns={columns}
        bordered
        dataSource={res?.metadata}
        loading={isFetching}
        pagination={{ onChange: handleChangePage, total: res?.total, defaultCurrent: page, pageSize: 10 }}
      />
    </section>
  );
}
