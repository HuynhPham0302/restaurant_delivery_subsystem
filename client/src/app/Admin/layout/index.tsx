import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { HiOutlinePaperClip } from 'react-icons/hi';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigation = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const path = useLocation().pathname;

  return (
    <Layout className='h-screen'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div>
          <h1 className='text-3xl font-bold text-center text-white'>LOGO</h1>
        </div>
        <Menu
          className='mt-6'
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[path]}
          onSelect={({ key }) => navigation(key)}
          items={[
            {
              key: '/admin/order',
              icon: <HiOutlinePaperClip />,
              label: 'Order',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,

            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className='h-full'
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
