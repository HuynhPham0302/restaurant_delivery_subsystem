import { createBrowserRouter } from 'react-router-dom';
import GoogleCallback from './app/Auth/Callback/GoogleCallback';
import Login from './app/Auth/Login/Login';
import HomePage from './app/HomePage/HomePage';

const Routers = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  {
    path: '/auth',
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/callback/google', element: <GoogleCallback /> },
    ],
  },
]);

export default Routers;
