import { createBrowserRouter } from 'react-router-dom';
import { GoogleCallback } from './app/Auth/Callback';
import { Login } from './app/Auth/Login';
import { HomePage } from './app/HomePage';
import { MainLayout } from './layouts/MainLayout';
import { ProductPage } from './app/ProductPage';
import { ProductDetail } from './app/ProductPage/ProductDetail';

const Routers = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/product', element: <ProductPage /> },
      { path: '/product/:slug', element: <ProductDetail /> },
    ],
  },
  {
    path: '/auth',
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/callback/google', element: <GoogleCallback /> },
    ],
  },
]);

export default Routers;
