import Logo from '@assets/images/logo.svg';
import Cart from '@assets/images/cart.svg';
import Translations from '@assets/languages/export';
import { Link } from 'react-router-dom';
import { Routes } from '@routes/pageConfig';
import './_style.scss';

const TopBar = () => {
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
          to={`/${Routes.index}`}
          className="top-bar-cart"
        >
          <div>
            <img alt={Translations.cart} src={Cart} />
            <span
              aria-live="polite"
              aria-label={`0 ${Translations.cart_items}`}
            >
              0
            </span>
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default TopBar;
