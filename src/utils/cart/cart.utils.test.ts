import {
  initializeCart,
  getItemsInCart,
  addNewCartList,
  requestPhoneListInfo,
} from './cart'; // ajusta el path si hace falta

import { requestPhoneInfo } from '@api/client';

jest.mock('@api/client', () => ({
  requestPhoneInfo: jest.fn(),
}));

const CART_LABEL = 'mbst-cart';

// =======================
// Helpers
// =======================

const mockPhoneInfo = {
  name: 'Galaxy S24',
  colorOptions: [
    {
      name: 'Negro',
      hexCode: '#000',
      imageUrl: 'black.png',
    },
  ],
  storageOptions: [
    {
      capacity: '128GB',
      price: 999,
    },
  ],
};

// =======================
// Tests
// =======================

describe('Cart utils', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  // =======================
  // initializeCart
  // =======================

  describe('initializeCart', () => {
    it('initializes cart in localStorage if not present', () => {
      initializeCart();

      const stored = localStorage.getItem(CART_LABEL);
      expect(stored).not.toBeNull();

      expect(JSON.parse(stored!)).toEqual({ items: [] });
    });

    it('does not override existing cart', () => {
      localStorage.setItem(CART_LABEL, JSON.stringify({ items: ['existing'] }));

      initializeCart();

      const stored = JSON.parse(localStorage.getItem(CART_LABEL)!);
      expect(stored.items).toEqual(['existing']);
    });
  });

  // =======================
  // getItemsInCart
  // =======================

  describe('getItemsInCart', () => {
    it('returns items from localStorage', () => {
      const items = [{ id: '1' }];

      localStorage.setItem(CART_LABEL, JSON.stringify({ items }));

      expect(getItemsInCart()).toEqual(items);
    });

    it('initializes cart and returns empty array if none exists', () => {
      const items = getItemsInCart();
      expect(items).toEqual([]);
    });
  });

  // =======================
  // addNewCartList
  // =======================

  describe('addNewCartList', () => {
    it('stores new cart list in localStorage', () => {
      const items = [{ id: '1' }, { id: '2' }];

      addNewCartList(items as any);

      const stored = JSON.parse(localStorage.getItem(CART_LABEL)!);

      expect(stored.items).toEqual(items);
    });
  });

  // =======================
  // requestPhoneListInfo
  // =======================

  describe('requestPhoneListInfo', () => {
    it('returns parsed cart items and total price', async () => {
      (requestPhoneInfo as jest.Mock).mockResolvedValue(mockPhoneInfo);

      const items = [
        {
          id: '1',
          selectedColor: '#000',
          selectedStorage: '128GB',
          timestamp: 123,
        },
      ];

      const result = await requestPhoneListInfo(items as any);

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toEqual({
        id: '1',
        image: 'black.png',
        name: 'Galaxy S24',
        storage: '128GB',
        color: 'Negro',
        price: 999,
        colorHex: '#000',
        timestamp: 123,
      });

      expect(result.totalPrice).toBe(999);
    });

    it('returns null item when color or storage option is missing', async () => {
      (requestPhoneInfo as jest.Mock).mockResolvedValue(mockPhoneInfo);

      const items = [
        {
          id: '1',
          selectedColor: '#FFF', // no existe
          selectedStorage: '128GB',
          timestamp: 123,
        },
      ];

      const result = await requestPhoneListInfo(items as any);

      expect(result.items).toEqual([null]);
      expect(result.totalPrice).toBe(0);
    });

    it('calculates total price for multiple items', async () => {
      (requestPhoneInfo as jest.Mock).mockResolvedValue(mockPhoneInfo);

      const items = [
        {
          id: '1',
          selectedColor: '#000',
          selectedStorage: '128GB',
          timestamp: 1,
        },
        {
          id: '2',
          selectedColor: '#000',
          selectedStorage: '128GB',
          timestamp: 2,
        },
      ];

      const result = await requestPhoneListInfo(items as any);

      expect(result.items).toHaveLength(2);
      expect(result.totalPrice).toBe(1998);
    });
  });
});
