const CART_LABEL = 'mbst-cart';

export const initializeCart = () => {
  if (!localStorage.getItem(CART_LABEL)) {
    localStorage.setItem(CART_LABEL, JSON.stringify({ items: [] }));
  }
};

export const getItemsInCart = (): { items: CartList } => {
  const jsonString = localStorage.getItem(CART_LABEL);

  if (!jsonString) {
    initializeCart();
  }

  const items = JSON.parse(jsonString!);
  return items;
};

export const addItemToCart = (item: CartItem) => {
  const jsonString = localStorage.getItem(CART_LABEL);
  const { items } = JSON.parse(jsonString!);
  items.push(item);

  localStorage.setItem(CART_LABEL, JSON.stringify({ items }));
};
