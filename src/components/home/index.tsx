import { useEffect, useContext } from 'react';
import { requestPhoneList } from '@api/client';
import { PhoneListContext } from '@components/app';

const Home = () => {
  const { setList } = useContext(PhoneListContext);

  useEffect(() => {
    const getPhoneList = async () => {
      try {
        const phoneList = await requestPhoneList(20, 0);
        setList(phoneList);
      } catch (e) {
        console.log(
          'There was an error trying to retrieve the phone list. Check your .env variables.',
        );
      }
    };
    getPhoneList();
  }, []);

  return <p>Live Home</p>;
};

export default Home;
