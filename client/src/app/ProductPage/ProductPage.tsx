import { ProductCard } from '@/components/ProductCard';
import { TCategory } from '@/types/Category.types';
import { TProduct } from '@/types/Product.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Col, Menu, MenuProps, Pagination, Row, Spin } from 'antd';
import qs from 'qs';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

export function ProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const { data: res, isFetching } = useQuery<TResponse<TProduct[]>>({
    queryKey: ['product', page, searchParams.get('category_id')],
    queryFn: async () =>
      await HTTP.GET(
        `/product?${qs.stringify({
          page,
          limit: 20,
          sort: 'desc',
          order: 'createdAt',
          category_id: searchParams.get('category_id') || undefined,
        })}`,
      ),
  });

  const { data: category } = useQuery<TResponse<TCategory[]>>({
    queryKey: ['category'],
    queryFn: async () => await HTTP.GET(`/category?${qs.stringify({ sort: 'asc', order: 'id' })}`),
  });

  const categoryMenuItem = (category: TCategory[]) => {
    const items: MenuItem[] = category.map((item) => ({
      key: item.id,
      label: item.name,
    }));
    items.unshift({ key: 'all', label: 'All' });
    return items;
  };

  return (
    <div className='pt-20 container mx-auto min-h-screen'>
      <h1 className='text-3xl font-bold mt-4'>All Product:</h1>
      <Row gutter={[20, 20]}>
        <Col span={4} className='my-8'>
          {category && (
            <div className='bg-white py-2'>
              <h1 className='text-2xl font-bold text-center py-4'>Category</h1>
              <Menu
                onClick={(e) => (e.key !== 'all' ? setSearchParams({ category_id: e.key }) : setSearchParams({}))}
                className='w-full'
                defaultSelectedKeys={[searchParams.get('category_id') || 'all']}
                mode='inline'
                items={categoryMenuItem(category?.metadata)}
              />
            </div>
          )}
        </Col>
        {!isFetching ? (
          <Col span={20} className='my-8 grid grid-cols-3 gap-x-8 gap-y-20'>
            {res?.metadata.map((product) => (
              <Link to={`/product/${product.slug}`} key={product.id}>
                <ProductCard data={product} />
              </Link>
            ))}
          </Col>
        ) : (
          <div className='flex flex-col items-center w-full justify-center space-y-3'>
            <Spin size='large' />
            <p>Loading...</p>
          </div>
        )}
        <Pagination
          className='w-full flex justify-center mt-8'
          current={page}
          total={res?.total}
          pageSize={20}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </Row>
    </div>
  );
}
