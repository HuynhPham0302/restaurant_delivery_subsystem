import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import GoogleCallback from './app/Auth/Google/GoogleCallback';

const Routers = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/google/callback', element: <GoogleCallback /> },
]);

export default Routers;
