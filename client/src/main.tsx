import { StyleProvider } from '@ant-design/cssinjs';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Routers from './router.tsx';
import './styles/index.css';
import { ConfigProvider, ThemeConfig } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const theme: ThemeConfig = {
  token: {
    fontFamily: 'Inter, sans-serif',
    colorPrimary: '#2F27CE',
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <StyleProvider hashPriority='high'>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Routers} />
        </QueryClientProvider>
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
