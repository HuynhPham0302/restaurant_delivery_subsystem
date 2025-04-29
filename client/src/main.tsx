import { StyleProvider } from '@ant-design/cssinjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, ThemeConfig } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Routers from './router.tsx';
import './styles/index.css';

const queryClient = new QueryClient();

const theme: ThemeConfig = {
  token: {
    fontFamily: 'Quicksand, sans-serif',
    colorPrimary: '#2D2B38',
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <StyleProvider hashPriority='high'>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Routers} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
