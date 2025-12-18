import PhoneCustomization from '@elements/phone-customization';
import PhoneSpecs from '@elements/phone-specs';
import PhoneSlideShow from '@elements/phone-slideshow';
import Back from '@assets/images/arrow.svg';
import Translations from '@assets/languages/export';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '@components/app';
import { Routes } from '@routes/pageConfig';
import { useDelayedLoading } from '@utils/delay-custom-hook/delay';
import { requestPhoneInfo } from '@api/client';
import './_style.scss';

interface MobileViewProps {
  id: string;
}

const MobileView = ({ id }: MobileViewProps) => {
  const { setItem } = useContext(CartContext);
  const [data, setData] = useState<PhoneItem | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const showLoading = useDelayedLoading(loading);

  const addToCart = (selectedColor: number, selectedStorage: number) => {
    const cartItem = {
      id: data!.id,
      selectedColor: data!.colorOptions[selectedColor].hexCode,
      selectedStorage: data!.storageOptions[selectedStorage].capacity,
      timestamp: Date.now(),
    };
    setItem(cartItem);
  };

  useEffect(() => {
    const getMobileInfo = async () => {
      setData(null);
      setError(null);
      setLoading(true);

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
    <section
      aria-label={Translations.phone_info}
      aria-busy={loading}
      className="phone-container"
    >
      <nav aria-label={Translations.back}>
        <Link to={`/${Routes.index}`} className="back-container">
          <img src={Back} alt="" />
          <span>{Translations.back}</span>
        </Link>
      </nav>
      {showLoading && (
        <p role="status" aria-live="polite" className="loading-phone-info">
          {Translations.loading_phone_info}
        </p>
      )}
      {error && <p role="alert">{error}</p>}
      {data && (
        <>
          <section className="phone-main-customization-container">
            <PhoneCustomization data={data} addToCart={addToCart} />
          </section>
          <section
            aria-labelledby="specifications-title"
            className="phone-specifications-container"
          >
            <h1 id="specifications-title">{Translations.specifications}</h1>
            <PhoneSpecs
              specs={data.specs}
              name={data.name}
              brand={data.brand}
              description={data.description}
            />
          </section>
          <section
            aria-labelledby="similar-items-title"
            className="phone-similar-items-container"
          >
            <h1 id="similar-items-title">{Translations.similar_items}</h1>
            <PhoneSlideShow data={data.similarProducts} />
          </section>
          <div aria-hidden="true" className="preload-images">
            {data.colorOptions?.map(item => (
              <img
                src={item.imageUrl}
                alt=""
                key={`IMAGE_PRELOAD_${item.hexCode}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default MobileView;
