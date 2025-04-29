/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProfile } from '@/types/Profile.types';
import { TUser } from '@/types/User.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { useQuery } from '@tanstack/react-query';
import { Button, Modal, Table, TableProps, message } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import qs from 'qs';

export default function AdminUser() {
  const [api, contextHolder] = message.useMessage();
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(1);

  const { data: user, isLoading } = useQuery<TResponse<TProfile[]>>({
    queryKey: ['user', reload, page],
    queryFn: async () => await HTTP.GET(`/auth/user?${qs.stringify({ page, limit: 10, sort: 'asc', order: 'id' })}`),
  });

  const handleBlockUser = async (id: string, is_blocked: boolean) => {
    if (is_blocked) {
      Modal.confirm({
        title: 'Do you want to unblock this user?',
        onCancel: Modal.destroyAll,
        onOk: async () => {
          await HTTP.PUT(`/auth/user/${id}`, { is_blocked: false });
          api.success('Unblock user successfully');
          setReload(!reload);
        },
      });
    } else {
      Modal.confirm({
        title: 'Do you want to block this user?',
        onCancel: Modal.destroyAll,
        onOk: async () => {
          await HTTP.PUT(`/auth/user/${id}`, {
            is_blocked: true,
          });
          api.success('Block user successfully');
          setReload(!reload);
        },
      });
    }
  };

  const columns: TableProps<any>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'FullName', dataIndex: 'user', key: 'fullName', render: (user: TUser) => user.fullName },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone Number', dataIndex: 'user', key: 'phone_number', render: (user: TUser) => user.phone_number },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: 'Status',
      dataIndex: 'is_blocked',
      key: 'is_blocked',
      render: (is_blocked: boolean) => (is_blocked ? 'Blocked' : 'Active'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record: TProfile) => (
        <Button danger size='small' onClick={() => handleBlockUser(record.id, record.is_blocked)}>
          {record.is_blocked ? 'Unblock' : 'Block'}
        </Button>
      ),
    },
  ];

  return (
    <section>
      {contextHolder}
      <h1 className='text-2xl font-bold'>User Management</h1>
      <Table
        pagination={{
          pageSize: 10,
          total: user?.total,
          current: page,
          onChange: (page) => setPage(page),
        }}
        loading={isLoading}
        className='mt-4'
        columns={columns}
        dataSource={user?.metadata}
        rowKey='id'
      />
    </section>
  );
}
