import TopBar from '@elements/top-bar';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import { getItemsInCart, addItemToCart } from '@utils/cart';
import './_style.scss';

interface AppInterface {
  children: ReactNode;
}

export const CartContext = createContext<{
  items: CartList;
  setItem: (obj: CartItem) => void;
}>({ items: [], setItem: (_: CartItem) => {} });

const App = ({ children }: AppInterface) => {
  const [cartList, setCartList] = useState<CartList>([]);

  const setNewItemCartList = (item: CartItem) => {
    addItemToCart(item);
    setCartList([...cartList, item]);
  };

  useEffect(() => {
    const { items } = getItemsInCart();
    setCartList(items);
  }, []);

  return (
    <CartContext.Provider
      value={{ items: cartList, setItem: setNewItemCartList }}
    >
      <TopBar />
      <main className="page-container">{children}</main>
      <ScrollRestoration />
    </CartContext.Provider>
  );
};

export default App;
