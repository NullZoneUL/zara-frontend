import Translations from '@assets/languages/export';
import { Link } from 'react-router-dom';
import { Routes } from '@routes/pageConfig';
import './_style.scss';

interface PhoneItemInterface {
  itemInfo: PhoneListItem;
}

const PhoneItem = ({ itemInfo }: PhoneItemInterface) => {
  const { brand, name, basePrice, imageUrl, id } = itemInfo;

  return (
    <Link
      aria-label={Translations.go_product}
      to={`/${Routes.index}`}
      className="phone-item-link-container"
    >
      <div className="phone-item-container">
        <img src={imageUrl} alt={`${brand} ${name}`} />
        <div className="phone-info-container">
          <h3>{brand}</h3>
          <div className="phone-name-price">
            <h2 className="phone-name">{name}</h2>
            <h2 className="phone-price">{basePrice}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PhoneItem;
