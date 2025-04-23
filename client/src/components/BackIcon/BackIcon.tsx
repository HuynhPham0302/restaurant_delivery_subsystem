import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export function BackIcon() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)} className='flex items-center text-3xl font-bold cursor-pointer'>
      <IoIosArrowBack />
      <p>Back</p>
    </div>
  );
}
