import { Outlet } from 'react-router-dom';
import { Header } from '../Header';

export function MainLayout() {
  return (
    <main className='bg-[#f5f5fa] min-h-screen'>
      <div className='w-full bg-white'>
        <div className='container mx-auto'>
          <Header />
        </div>
      </div>
      <Outlet />
    </main>
  );
}
