import { createBrowserRouter } from 'react-router-dom';
import { GoogleCallback } from './app/Auth/Callback';
import { Login } from './app/Auth/Login';
import { HomePage } from './app/HomePage';
import { MainLayout } from './layouts/MainLayout';
import { ProductPage } from './app/ProductPage';
import { ProductDetail } from './app/ProductPage/ProductDetail';
import CartPage from './app/CartPage/CartPage';
import AdminLayout from './app/Admin/layout';
import AdminOrder from './app/Admin/Order';
import CheckOut from './app/Checkout';
import AdminAllProduct from './app/Admin/Product/All';
import AdminCreateProduct from './app/Admin/Product/Create';

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
      { path: '/admin/order', element: <AdminOrder /> },
      { path: '/admin/product/all', element: <AdminAllProduct /> },
      { path: '/admin/product/create', element: <AdminCreateProduct /> },
    ],
  },
]);

export default Routers;
