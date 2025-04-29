import { createBrowserRouter } from 'react-router-dom';
import AdminAllCategory from './app/Admin/Category/All';
import AdminChart from './app/Admin/Chart';
import AdminOrder from './app/Admin/Order';
import AdminAllProduct from './app/Admin/Product/All';
import AdminCreateProduct from './app/Admin/Product/Create';
import AdminEditProduct from './app/Admin/Product/Edit';
import StatisticalReport from './app/Admin/StatisticalReport';
import AdminLayout from './app/Admin/layout';
import { GoogleCallback } from './app/Auth/Callback';
import { Login } from './app/Auth/Login';
import CartPage from './app/CartPage/CartPage';
import CheckOut from './app/Checkout';
import { HomePage } from './app/HomePage';
import { ProductPage } from './app/ProductPage';
import { ProductDetail } from './app/ProductPage/ProductDetail';
import { MainLayout } from './layouts/MainLayout';
import AdminUser from './app/Admin/User';

const Routers = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/product', element: <ProductPage /> },
      { path: '/product/:slug', element: <ProductDetail /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout/success', element: <CheckOut /> },
    ],
  },
  {
    path: '/auth',
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/callback/google', element: <GoogleCallback /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '/admin', element: <AdminChart /> },
      { path: '/admin/statistical_report', element: <StatisticalReport /> },
      { path: '/admin/user', element: <AdminUser /> },
      { path: '/admin/order', element: <AdminOrder /> },
      { path: '/admin/product/all', element: <AdminAllProduct /> },
      { path: '/admin/product/create', element: <AdminCreateProduct /> },
      { path: '/admin/product/edit/:id', element: <AdminEditProduct /> },
      { path: '/admin/category', element: <AdminAllCategory /> },
    ],
  },
]);

export default Routers;
