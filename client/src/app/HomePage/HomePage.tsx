import { Sidebar } from '@/components/HomePage/Sidebar';

export function HomePage() {
  return (
    <main className='container mx-auto'>
      <div className='flex space-x-4 mt-8'>
        <div className='w-[15%] relative'>
          <Sidebar />
        </div>
        <div className='flex-1 bg-white h-[200vh] rounded-md p-2'>b</div>
      </div>
    </main>
  );
}
