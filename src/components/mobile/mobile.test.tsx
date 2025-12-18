import MobileView from '.';
import { render, screen, act } from '@testing-library/react';
import { requestPhoneInfo } from '@api/client';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children }: any) => <span>{children}</span>,
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({
    setItem: jest.fn(),
  }),
}));

jest.mock('@api/client', () => ({
  requestPhoneInfo: jest.fn(),
}));

jest.mock('@elements/phone-customization', () => (props: any) => (
  <button data-testid="add-to-cart" onClick={() => props.addToCart(0, 0)}>
    Add to cart
  </button>
));

jest.mock('@elements/phone-specs', () => () => <div data-testid="specs" />);
jest.mock('@elements/phone-slideshow', () => () => (
  <div data-testid="slideshow" />
));

const mockPhone = {
  id: '1',
  brand: 'Samsung',
  name: 'Galaxy S24',
  description: 'Flagship phone',
  specs: {},
  similarProducts: [],
  colorOptions: [
    {
      hexCode: '#000000',
      imageUrl: 'black.png',
      name: 'Black',
    },
  ],
  storageOptions: [
    {
      capacity: '128GB',
      price: 999,
    },
  ],
};

describe('MobileView component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders loading status after delay', async () => {
    (requestPhoneInfo as jest.Mock).mockImplementation(
      () => new Promise(() => {}),
    );

    render(<MobileView id="1" />);

    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders phone information when data is loaded', async () => {
    (requestPhoneInfo as jest.Mock).mockResolvedValue(mockPhone);

    render(<MobileView id="1" />);

    expect(
      await screen.findByRole('region', {
        name: /phone information/i,
      }),
    ).toBeInTheDocument();

    expect(await screen.findByTestId('add-to-cart')).toBeInTheDocument();

    expect(
      await screen.findByRole('heading', { name: /specifications/i }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('heading', { name: /similar items/i }),
    ).toBeInTheDocument();
  });

  it('renders error message when request fails', async () => {
    (requestPhoneInfo as jest.Mock).mockRejectedValueOnce(new Error('Fail'));

    render(<MobileView id="1" />);

    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  it('calls setItem with correct data when addToCart is triggered', async () => {
    const setItemMock = jest.fn();

    jest
      .spyOn(require('react'), 'useContext')
      .mockReturnValue({ setItem: setItemMock });

    (requestPhoneInfo as jest.Mock).mockResolvedValue(mockPhone);

    render(<MobileView id="1" />);

    const addButton = await screen.findByTestId('add-to-cart');

    act(() => {
      addButton.click();
    });

    expect(setItemMock).toHaveBeenCalledTimes(1);
    expect(setItemMock).toHaveBeenCalledWith({
      id: '1',
      selectedColor: '#000000',
      selectedStorage: '128GB',
      timestamp: Date.now(),
    });
  });
});
