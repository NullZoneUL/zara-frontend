import { useContext } from 'react';
import { CartContext } from '@components/app';
import './_style.scss';

const CartView = () => {
  const { items } = useContext(CartContext);
  console.log(items);

  return <>Cart Live</>;
};

export default CartView;
