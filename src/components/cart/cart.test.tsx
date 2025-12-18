import CartView from '.';
import Translations from '@assets/languages/export';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { CartContext } from '@components/app';
import { requestPhoneListInfo } from '@utils/cart/cart';

jest.mock('@utils/cart/cart', () => ({
  requestPhoneListInfo: jest.fn(),
}));

jest.mock('@utils/delay-custom-hook/delay', () => ({
  useDelayedLoading: jest.fn(),
}));

jest.mock('@elements/cart-item', () => (props: any) => (
  <li data-testid="cart-item">{props.info.name}</li>
));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children }: any) => <span>{children}</span>,
}));

const mockParsedItem = {
  id: '1',
  name: 'Galaxy S24',
  image: 'phone.png',
  color: 'Negro',
  colorHex: '#000000',
  storage: '128GB',
  price: '999',
  timestamp: 123456,
};

const defaultContextValue = {
  items: [{ id: '1', colorHex: '#000000', storage: '128GB' }],
  removeItem: jest.fn(),
};

const renderWithContext = (contextValue = defaultContextValue) =>
  render(
    <CartContext.Provider value={contextValue as any}>
      <MemoryRouter>
        <CartView />
      </MemoryRouter>
    </CartContext.Provider>,
  );

describe('CartView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading message when delayed loading is active', () => {
    const { useDelayedLoading } = require('@utils/delay-custom-hook/delay');
    useDelayedLoading.mockReturnValue(true);

    renderWithContext();

    expect(screen.getByRole('status')).toHaveTextContent(
      Translations.loading_cart_info,
    );
  });

  it('renders empty cart view when there are no items', async () => {
    const { useDelayedLoading } = require('@utils/delay-custom-hook/delay');
    useDelayedLoading.mockReturnValue(false);

    renderWithContext({ items: [], removeItem: jest.fn() });

    expect(
      await screen.findByText(Translations.continue_shopping),
    ).toBeInTheDocument();
  });

  it('renders cart items and total price when request succeeds', async () => {
    const { useDelayedLoading } = require('@utils/delay-custom-hook/delay');
    useDelayedLoading.mockReturnValue(false);

    (requestPhoneListInfo as jest.Mock).mockResolvedValue({
      items: [mockParsedItem],
      totalPrice: 999,
    });

    renderWithContext();

    expect(
      await screen.findByRole('heading', {
        name: `${Translations.cart} (1)`,
      }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('cart-item')).toBeInTheDocument();

    expect(
      screen.getByLabelText(`${Translations.total_price}: 999`),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: Translations.pay }),
    ).toBeInTheDocument();
  });

  it('renders error message when requestPhoneListInfo fails', async () => {
    const { useDelayedLoading } = require('@utils/delay-custom-hook/delay');
    useDelayedLoading.mockReturnValue(false);

    (requestPhoneListInfo as jest.Mock).mockRejectedValueOnce(
      new Error('fail'),
    );

    renderWithContext();

    expect(await screen.findByRole('alert')).toHaveTextContent(
      Translations.cart_request_error,
    );
  });

  it('passes removeItem to CartItem components', async () => {
    const { useDelayedLoading } = require('@utils/delay-custom-hook/delay');
    useDelayedLoading.mockReturnValue(false);

    (requestPhoneListInfo as jest.Mock).mockResolvedValue({
      items: [mockParsedItem],
      totalPrice: 999,
    });

    renderWithContext();

    expect(await screen.findByTestId('cart-item')).toBeInTheDocument();
  });
});
