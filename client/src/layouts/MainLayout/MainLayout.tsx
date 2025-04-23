import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function MainLayout() {
  return (
    <main className='bg-[#f5f5fa] min-h-screen relative'>
      <div className='w-full bg-white fixed z-20'>
        <div className='container mx-auto'>
          <Header />
        </div>
      </div>
      <main className='bg-slate-100'>
        <Outlet />
      </main>
      <Footer />
    </main>
  );
}
