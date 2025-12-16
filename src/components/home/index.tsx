import PhoneItem from '@elements/phone-item';
import Translations from '@assets/languages/export';
import { useEffect, useState } from 'react';
import { requestPhoneList } from '@api/client';
import './_style.scss';

const Home = () => {
  const [phoneList, setPhoneList] = useState<PhoneList>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPhoneList = async () => {
      try {
        const phoneList_ = await requestPhoneList(20, 0);
        setPhoneList(phoneList_);
      } catch (e) {
        console.log(Translations.request_error, e);
        setError(Translations.request_error);
      } finally {
        setLoading(false);
      }
    };
    getPhoneList();
  }, []);

  return (
    <section
      aria-label={Translations.phone_list}
      className="phone-list-container"
    >
      {loading && <p>{Translations.loading_phone_list}</p>}
      {error && <p role="alert">{error}</p>}
      {phoneList?.map((phone, index) => (
        <PhoneItem itemInfo={phone} key={`PHONE_ITEM_${phone.id}_${index}`} />
      ))}
    </section>
  );
};

export default Home;
