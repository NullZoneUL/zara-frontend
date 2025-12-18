import Translations from '@assets/languages/export';
import './_style.scss';

interface CartItemProps {
  info: ParsedCartItemInterface;
  onDelete: (id: string) => void;
}

const CartItem = ({ info, onDelete }: CartItemProps) => {
  const { image, name, color, storage, price, id } = info;

  return (
    <li className="cart-item-container">
      <figure>
        <img src={image} alt={`${name} ${color} ${storage}`} />
      </figure>
      <div className="phone-info-section">
        <h2>{name}</h2>
        <h3>{`${storage} | ${color}`}</h3>
        <span aria-label={`${Translations.price} ${price}`}>{price}</span>
        <button type="button" onClick={() => onDelete(id)}>
          {Translations.delete}
        </button>
      </div>
    </li>
  );
};

export default CartItem;
