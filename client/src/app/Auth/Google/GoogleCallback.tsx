import { Button } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function GoogleCallback() {
  const location = useLocation();

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/v1/api/auth/google/callback?code=${location.search.split('=')[1]}`,
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <Button onClick={getData} type='primary' className='mt-10'>
        Get data user
      </Button>
    </main>
  );
}
