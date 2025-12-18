import SearchEngine from '@elements/search-engine';
import PhoneItem from '@elements/phone-item';
import Translations from '@assets/languages/export';
import { useCallback, useEffect, useState } from 'react';
import { requestPhoneList } from '@api/client';
import { useDelayedLoading } from '@utils/delay-custom-hook/delay';
import './_style.scss';

const Home = () => {
  const [phoneList, setPhoneList] = useState<PhoneList>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const showLoading = useDelayedLoading(loading);

  const onSeachInput = useCallback((text: string) => setSearchValue(text), []);

  useEffect(() => {
    const getPhoneList = async () => {
      setError(null);

      try {
        const limit = searchValue ? undefined : 20;
        const phoneList_ = await requestPhoneList(limit, 0, searchValue);
        setPhoneList(phoneList_);
      } catch (_) {
        setError(Translations.request_error);
      } finally {
        setLoading(false);
      }
    };
    getPhoneList();
  }, [searchValue]);

  return (
    <>
      {!loading && !error && (
        <SearchEngine numResults={phoneList!.length} onInput={onSeachInput} />
      )}
      <section
        aria-label={Translations.phone_list}
        className="phone-list-container"
      >
        {showLoading && (
          <p role="status" aria-live="polite">
            {Translations.loading_phone_list}
          </p>
        )}
        {error && <p role="alert">{error}</p>}
        {phoneList?.map((phone, index) => (
          <PhoneItem itemInfo={phone} key={`PHONE_ITEM_${phone.id}_${index}`} />
        ))}
      </section>
    </>
  );
};

export default Home;
