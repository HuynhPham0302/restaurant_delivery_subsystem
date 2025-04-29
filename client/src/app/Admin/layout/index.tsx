import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { BiCategory, BiSolidUser } from 'react-icons/bi';
import { FaChartLine } from 'react-icons/fa';
import { HiOutlinePaperClip, HiOutlineTemplate } from 'react-icons/hi';
import { TbReport } from 'react-icons/tb';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

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
        <Link to='/admin'>
          <h1 className='text-3xl font-bold text-center text-white'>LOGO</h1>
        </Link>
        <Menu
          className='mt-6'
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[path]}
          onSelect={({ key }) => navigation(key)}
          items={[
            {
              key: '/admin',
              icon: <TbReport />,
              label: 'Report',
            },
            {
              key: '/admin/sales_report',
              icon: <FaChartLine />,
              label: 'Sales Report',
            },
            {
              key: '/admin/user',
              icon: <BiSolidUser />,
              label: 'User',
            },
            {
              key: '/admin/order',
              icon: <HiOutlinePaperClip />,
              label: 'Order',
            },
            {
              key: '/admin/product',
              icon: <HiOutlineTemplate />,
              label: 'Product',
              children: [
                {
                  key: '/admin/product/all',
                  label: 'List',
                },
                {
                  key: '/admin/product/create',
                  label: 'Create',
                },
              ],
            },
            {
              key: '/admin/category',
              label: 'Category',
              icon: <BiCategory />,
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
          className='h-full overflow-y-auto'
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
