import Logo from '@assets/images/logo.svg';
import Cart from '@assets/images/cart.svg';
import CartItems from '@assets/images/cart-items.svg';
import Translations from '@assets/languages/export';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '@components/app';
import { Routes } from '@routes/pageConfig';
import './_style.scss';

const TopBar = () => {
  const { items } = useContext(CartContext);
  const cartLength = items.length;

  return (
    <header>
      <nav aria-label={Translations.main_navigation}>
        <Link
          aria-label={Translations.return_home}
          to={`/${Routes.index}`}
          className="top-bar-logo"
        >
          <img alt={Translations.logo} src={Logo} />
        </Link>
        <Link
          aria-label={Translations.go_cart}
          to={`/${Routes.cart}`}
          className="top-bar-cart"
        >
          <div>
            <img
              alt={Translations.cart}
              src={cartLength > 0 ? CartItems : Cart}
            />
            <span
              aria-live="polite"
              aria-label={`${cartLength} ${Translations.cart_items}`}
            >
              {cartLength}
            </span>
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default TopBar;
