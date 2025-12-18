import { requestPhoneInfo } from '@api/client';

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

export const requestPhoneListInfo = async (
  items: CartList,
): Promise<{
  items: (ParsedCartItemInterface | null)[];
  totalPrice: number;
}> => {
  let totalPrice = 0;
  const cartItemList = await Promise.all(
    items.map(async phone => {
      const info = await requestPhoneInfo(phone.id);

      const colorOption = info.colorOptions.find(
        color => color.hexCode === phone.selectedColor,
      );
      const storageOption = info.storageOptions.find(
        storage => storage.capacity === phone.selectedStorage,
      );

      if (!colorOption || !storageOption) return null;
      totalPrice += storageOption.price;

      return {
        id: phone.id,
        image: colorOption.imageUrl,
        name: info.name,
        storage: phone.selectedStorage,
        color: colorOption.name,
        price: storageOption.price,
      };
    }),
  );

  return { items: cartItemList, totalPrice };
};
