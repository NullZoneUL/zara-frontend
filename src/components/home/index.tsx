import { useEffect } from 'react';
import { requestPhoneList } from '@api/client';

const Home = () => {
  useEffect(() => {
    const getPhoneList = async () => {
      const phoneList = await requestPhoneList(20, 0);
      console.log(phoneList);
    };
    getPhoneList();
  }, []);

  return <p>Live Home</p>;
};

export default Home;
