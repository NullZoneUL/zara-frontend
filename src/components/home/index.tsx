import PhoneItem from '@elements/phone-item';
import Translations from '@assets/languages/export';
import { useEffect, useState } from 'react';
import { requestPhoneList } from '@api/client';
import './_style.scss';

const Home = () => {
  const [phoneList, setPhoneList] = useState<PhoneList>();

  useEffect(() => {
    const getPhoneList = async () => {
      try {
        const phoneList_ = await requestPhoneList(20, 0);
        setPhoneList(phoneList_);
      } catch (e) {
        console.log(Translations.request_error, e);
      }
    };
    getPhoneList();
  }, []);

  return (
    <div className="phone-list-container">
      {phoneList?.map((phone, index) => (
        <PhoneItem itemInfo={phone} key={`PHONE_ITEM_${phone.id}_${index}`} />
      ))}
    </div>
  );
};

export default Home;
