import Translations from '@assets/languages/export';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@components/app';
import { useDelayedLoading } from '@utils/delay-custom-hook/delay';
import { requestPhoneListInfo } from '@utils/cart';
import './_style.scss';

const CartView = () => {
  const { items } = useContext(CartContext);
  const [cartItemList, setCartItemList] = useState<
    ParsedCartItemInterface[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const showLoading = useDelayedLoading(loading);

  useEffect(() => {
    // Request phone info from cart list
    const requestAndParsePhoneListInfo = async () => {
      setError(null);
      setLoading(true);

      try {
        const cartItemList_ = await requestPhoneListInfo(items);

        setCartItemList(
          cartItemList_.filter(
            (item): item is ParsedCartItemInterface => item !== null,
          ),
        );
      } catch (_) {
        setError(Translations.cart_request_error);
      } finally {
        setLoading(false);
      }
    };

    items.length > 0 && requestAndParsePhoneListInfo();
  }, [items]);

  return (
    <section className="cart-list-container">
      {showLoading && (
        <p role="status" aria-live="polite" className="loading-phone-info">
          {Translations.loading_phone_info}
        </p>
      )}
      {error && <p role="alert">{error}</p>}
      {cartItemList && (
        <>
          <h1>{`${Translations.cart} (${cartItemList.length})`}</h1>
        </>
      )}
    </section>
  );
};

export default CartView;
