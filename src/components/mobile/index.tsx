import PhoneCustomization from '@elements/phone-customization';
import PhoneSpecs from '@elements/phone-specs';
import PhoneSlideShow from '@elements/phone-slideshow';
import Back from '@assets/images/arrow.svg';
import Translations from '@assets/languages/export';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '@routes/pageConfig';
import { requestPhoneInfo } from '@api/client';
import './_style.scss';

interface MobileViewProps {
  id: number;
}

const MobileView = ({ id }: MobileViewProps) => {
  const [data, setData] = useState<PhoneItem>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMobileInfo = async () => {
      setError(null);

      try {
        const data = await requestPhoneInfo(id);
        setData(data);
      } catch (_) {
        setError(Translations.phone_request_error);
      } finally {
        setLoading(false);
      }
    };

    getMobileInfo();
  }, [id]);

  return (
    <section aria-label={Translations.phone_info} className="phone-container">
      <Link
        aria-label={Translations.back}
        to={`/${Routes.index}`}
        className="back-container"
      >
        <img src={Back} alt="" />
        <span>{Translations.back}</span>
      </Link>
      {loading && (
        <p role="status" aria-live="polite">
          {Translations.loading_phone_info}
        </p>
      )}
      {error && <p role="alert">{error}</p>}
      {data && (
        <>
          <div className="phone-main-customization-container">
            <PhoneCustomization
              data={data}
              addToCart={() => console.log('TODO!!!')}
            />
          </div>
          <div className="phone-specifications-container">
            <h1>{Translations.specifications}</h1>
            <PhoneSpecs
              specs={data.specs}
              name={data.name}
              brand={data.brand}
              description={data.description}
            />
          </div>
          <div className="phone-similar-items-container">
            <h1>{Translations.similar_items}</h1>
            <PhoneSlideShow data={data.similarProducts} />
          </div>
        </>
      )}
    </section>
  );
};

export default MobileView;
