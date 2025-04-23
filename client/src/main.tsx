import { StyleProvider } from '@ant-design/cssinjs';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Routers from './router.tsx';
import './styles/index.css';
import { ConfigProvider, ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontFamily: 'Inter, sans-serif',
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <StyleProvider hashPriority='high'>
        <RouterProvider router={Routers} />
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
