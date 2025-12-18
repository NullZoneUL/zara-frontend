import TopBar from '@elements/top-bar';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import { getItemsInCart, addNewCartList } from '@utils/cart';
import './_style.scss';

interface AppInterface {
  children: ReactNode;
}

export const CartContext = createContext<{
  items: CartList;
  setItem: (obj: CartItem) => void;
  removeItem: (id: string, color: string, storage: string) => void;
}>({
  items: [],
  setItem: (_: CartItem) => {},
  removeItem: (_: string, __: string, ___: string) => {},
});

const App = ({ children }: AppInterface) => {
  const [cartList, setCartList] = useState<CartList>(getItemsInCart());

  const setNewItemCartList = (item: CartItem) => {
    setCartList([...cartList, item]);
  };

  const removeItemCartList = (id: string, color: string, storage: string) => {
    let removed = false;

    setCartList(
      cartList.filter(item => {
        if (
          !removed &&
          item.id === id &&
          item.selectedColor === color &&
          item.selectedStorage === storage
        ) {
          removed = true;
          return false;
        }
        return true;
      }),
    );
  };

  useEffect(() => {
    addNewCartList(cartList);
  }, [cartList]);

  return (
    <CartContext.Provider
      value={{
        items: cartList,
        setItem: setNewItemCartList,
        removeItem: removeItemCartList,
      }}
    >
      <TopBar />
      <main className="page-container">{children}</main>
      <ScrollRestoration />
    </CartContext.Provider>
  );
};

export default App;
