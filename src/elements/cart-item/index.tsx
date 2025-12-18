import Translations from '@assets/languages/export';
import { useRef } from 'react';
import './_style.scss';

interface CartItemProps {
  info: ParsedCartItemInterface;
  onDelete: (id: string, color: string, storage: string) => void;
}

const REMOVE_ITEM_TIMER = 500;

const CartItem = ({ info, onDelete }: CartItemProps) => {
  const { image, name, color, storage, price, id, colorHex } = info;
  const ref = useRef<HTMLLIElement>(null);

  const onClick = () => {
    ref.current!.style.maxHeight = '0';
    ref.current!.style.marginBottom = '0';

    setTimeout(() => {
      onDelete(id, colorHex, storage);
    }, REMOVE_ITEM_TIMER);
  };

  return (
    <li className="cart-item-container" ref={ref}>
      <figure>
        <img src={image} alt={`${name} ${color} ${storage}`} />
      </figure>
      <div className="phone-info-section">
        <h2>{name}</h2>
        <h3>{`${storage} | ${color}`}</h3>
        <span aria-label={`${Translations.price} ${price}`}>{price}</span>
        <button
          type="button"
          onClick={onClick}
          aria-label={`${Translations.delete} ${name} ${storage} ${color}`}
        >
          {Translations.delete}
        </button>
      </div>
    </li>
  );
};

export default CartItem;
