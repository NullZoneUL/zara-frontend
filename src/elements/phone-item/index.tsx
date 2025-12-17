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
      aria-label={`${Translations.go_product} ${brand} ${name}`}
      to={`/${Routes.mobile}/${id}`}
      className="phone-item-link-container"
    >
      <div className="phone-item-container">
        <img src={imageUrl} alt={`${brand} ${name}`} />
        <div className="phone-info-container">
          <h3>{brand}</h3>
          <div className="phone-name-price">
            <h4 className="phone-name">{name}</h4>
            <h4
              className="phone-price"
              aria-label={`${Translations.price}: ${basePrice}`}
            >
              {basePrice}
            </h4>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PhoneItem;
