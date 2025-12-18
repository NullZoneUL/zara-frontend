import CartItem from '@elements/cart-item';
import Translations from '@assets/languages/export';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '@components/app';
import { Routes } from '@routes/pageConfig';
import { useDelayedLoading } from '@utils/delay-custom-hook/delay';
import { requestPhoneListInfo } from '@utils/cart';
import './_style.scss';

const CartView = () => {
  const { items, removeItem } = useContext(CartContext);
  const [cartItemList, setCartItemList] = useState<ParsedCartItemInterface[]>(
    [],
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const firstLoad = useRef(true);

  const showLoading = useDelayedLoading(loading);

  useEffect(() => {
    // Request phone info from cart list
    const requestAndParsePhoneListInfo = async () => {
      setError(null);
      setLoading(true);

      try {
        const { items: cartItemList_, totalPrice } =
          await requestPhoneListInfo(items);

        setCartItemList(
          cartItemList_.filter(
            (item): item is ParsedCartItemInterface => item !== null,
          ),
        );
        setTotalPrice(totalPrice);
      } catch (_) {
        setError(Translations.cart_request_error);
      } finally {
        firstLoad.current = false;
        setLoading(false);
      }
    };

    if (items.length > 0) {
      requestAndParsePhoneListInfo();
    } else {
      firstLoad.current = false;
      setLoading(false);
      setCartItemList([]);
    }
  }, [items]);

  return (
    <section className="cart-list-container">
      {showLoading && (
        <p role="status" aria-live="polite" className="loading-cart-info">
          {Translations.loading_cart_info}
        </p>
      )}
      {error && <p role="alert">{error}</p>}
      {cartItemList && !firstLoad.current && !error && (
        <>
          <h1>{`${Translations.cart} (${cartItemList.length})`}</h1>
          {cartItemList.length > 0 ? (
            <>
              <ul className="cart-item-list" aria-live="polite">
                {cartItemList.map((item, index) => (
                  <CartItem
                    info={item}
                    key={`CART_ITEM_${item.id}_${item.colorHex}_${item.storage}_${index}`}
                    onDelete={removeItem}
                  />
                ))}
              </ul>
              <div className="bottom-pay-container">
                <p
                  className="total-price"
                  aria-label={`${Translations.total_price}: ${totalPrice}`}
                >
                  {Translations.total}
                  <span>{totalPrice}</span>
                </p>
                <Link
                  aria-label={Translations.return_home}
                  to={`/${Routes.index}`}
                  className="continue-shopping"
                >
                  {Translations.continue_shopping}
                </Link>
                <button
                  type="button"
                  onClick={() => alert('Done!')}
                  aria-label={Translations.pay}
                >
                  {Translations.pay}
                </button>
              </div>
            </>
          ) : (
            <div className="bottom-pay-container cart-no-items">
              <Link
                aria-label={Translations.return_home}
                to={`/${Routes.index}`}
                className="continue-shopping"
              >
                {Translations.continue_shopping}
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CartView;
