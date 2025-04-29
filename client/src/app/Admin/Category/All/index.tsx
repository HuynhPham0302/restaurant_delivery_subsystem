/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCategory } from '@/types/Category.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery, QueryClient } from '@tanstack/react-query';
import { Button, Divider, Form, Input, Modal, Table, TableProps, message } from 'antd';
import { useState } from 'react';

const VALIDATION_RULES = [{ required: true, message: 'This field is required' }];

export default function AdminAllCategory() {
  const queryClient = new QueryClient();
  const [create, setCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = message.useMessage();
  const { data: category, isLoading } = useQuery<TResponse<TCategory[]>>({
    queryKey: ['category'],
    queryFn: async () => await HTTP.GET(`/category`),
  });

  const columns: TableProps<any>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
  ];

  const handleCreateCategory = async (values: any) => {
    setLoading(true);
    const createCategory = await HTTP.POST<TResponse<TCategory>>(`/category`, values);
    if (createCategory.status_code === 201) {
      setCreate(false);
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ['category'] });
      api.success(createCategory.message);
    } else {
      setLoading(false);
      api.error(createCategory.message);
    }
  };

  return (
    <section>
      {contextHolder}
      <h1 className='text-2xl font-bold'>Category</h1>
      <Table columns={columns} dataSource={category?.metadata} loading={isLoading} rowKey='id' />
      <Divider />
      <div className='flex items-center justify-end w-full'>
        <Button type='primary' onClick={() => setCreate(true)}>
          Crate Category
        </Button>
      </div>
      <Modal title='Create new Category' open={create} onCancel={() => setCreate(false)} footer={null}>
        <Form onFinish={handleCreateCategory} layout='vertical'>
          <Form.Item label='Name' name='name' rules={VALIDATION_RULES}>
            <Input />
          </Form.Item>
          <Form.Item label='Description' name='description' rules={VALIDATION_RULES}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label='Type' name='type' rules={VALIDATION_RULES}>
            <Input />
          </Form.Item>
          <div className='flex items-center justify-end'>
            <Button disabled={loading} loading={loading} type='primary' htmlType='submit'>
              Create
            </Button>
          </div>
        </Form>
      </Modal>
    </section>
  );
}
