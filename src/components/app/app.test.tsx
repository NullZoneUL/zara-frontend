import App, { CartContext } from '.';
import { useContext } from 'react';
import { render, screen, act } from '@testing-library/react';
import { getItemsInCart, addNewCartList } from '@utils/cart/cart';
import '@testing-library/jest-dom';

jest.mock('@elements/top-bar', () => () => <div data-testid="topbar" />);
jest.mock('react-router-dom', () => ({
  ScrollRestoration: () => <div data-testid="scroll-restoration" />,
}));

jest.mock('@utils/cart/cart', () => ({
  getItemsInCart: jest.fn(),
  addNewCartList: jest.fn(),
}));

const mockItem = {
  id: '1',
  selectedColor: 'black',
  selectedStorage: '128',
  timestamp: 2222222,
};

const ContextConsumer = () => {
  const { items, setItem, removeItem } = useContext(CartContext);

  return (
    <>
      <div data-testid="items-length">{items.length}</div>
      <button onClick={() => setItem(mockItem)}>add</button>
      <button
        onClick={() =>
          removeItem(
            mockItem.id,
            mockItem.selectedColor,
            mockItem.selectedStorage,
          )
        }
      >
        remove
      </button>
    </>
  );
};

describe('App CartContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes the cart with items from getItemsInCart', () => {
    (getItemsInCart as jest.Mock).mockReturnValue([mockItem]);

    render(
      <App>
        <ContextConsumer />
      </App>,
    );

    expect(screen.getByTestId('items-length')).toHaveTextContent('1');
  });

  it('adds a new item to the cart using setItem', () => {
    (getItemsInCart as jest.Mock).mockReturnValue([]);

    render(
      <App>
        <ContextConsumer />
      </App>,
    );

    act(() => {
      screen.getByText('add').click();
    });

    expect(screen.getByTestId('items-length')).toHaveTextContent('1');
  });

  it('removes only one matching item by id, color, and storage', () => {
    (getItemsInCart as jest.Mock).mockReturnValue([
      mockItem,
      mockItem, // duplicated item
    ]);

    render(
      <App>
        <ContextConsumer />
      </App>,
    );

    expect(screen.getByTestId('items-length')).toHaveTextContent('2');

    act(() => {
      screen.getByText('remove').click();
    });

    expect(screen.getByTestId('items-length')).toHaveTextContent('1');
  });

  it('calls addNewCartList whenever the cart changes', () => {
    (getItemsInCart as jest.Mock).mockReturnValue([]);

    render(
      <App>
        <ContextConsumer />
      </App>,
    );

    act(() => {
      screen.getByText('add').click();
    });

    expect(addNewCartList).toHaveBeenLastCalledWith([mockItem]);
  });
});
