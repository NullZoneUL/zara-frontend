import { render, screen, fireEvent } from '@testing-library/react';
import PhoneCustomization from '.';

const mockData: PhoneItem = {
  id: '1',
  brand: 'Samsung',
  name: 'Galaxy S24',
  description: 'Test description',
  rating: 4.5,
  basePrice: 999,
  specs: {
    screen: '6.8" Dynamic AMOLED 2X',
    resolution: '3120 x 1440 pixels',
    processor: 'Qualcomm Snapdragon 8 Gen 3 for Galaxy Octa-Core',
    mainCamera:
      '200 MP (F1.7) Principal, OIS + 10 MP (F2.4) Zoom x3, OIS + 12 MP (F2.2) Ultra gran angular + 50 MP (F3.4) Zoom x5, OIS',
    selfieCamera: '12 MP',
    battery: '5000 mAh',
    os: 'Android 14',
    screenRefreshRate: '120 Hz',
  },
  similarProducts: [],
  storageOptions: [
    { capacity: '128 GB', price: 999 },
    { capacity: '256 GB', price: 1099 },
  ],
  colorOptions: [
    {
      name: 'Black',
      hexCode: '#000000',
      imageUrl: 'black.png',
    },
    {
      name: 'Silver',
      hexCode: '#C0C0C0',
      imageUrl: 'silver.png',
    },
  ],
};

describe('PhoneCustomization', () => {
  const addToCartMock = jest.fn();

  beforeEach(() => {
    addToCartMock.mockClear();
  });

  it('renders phone title and base price', () => {
    render(<PhoneCustomization data={mockData} addToCart={addToCartMock} />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Samsung Galaxy S24/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('From 999')).toBeInTheDocument();
  });

  it('disables add to cart button initially', () => {
    render(<PhoneCustomization data={mockData} addToCart={addToCartMock} />);

    const button = screen.getByRole('button', { name: /add/i });
    expect(button).toBeDisabled();
  });

  it('allows selecting storage and color', () => {
    render(<PhoneCustomization data={mockData} addToCart={addToCartMock} />);

    fireEvent.click(screen.getByRole('button', { name: '128 GB' }));
    fireEvent.click(screen.getByRole('button', { name: 'Black' }));

    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeEnabled();
  });

  it('calls addToCart with selected options', () => {
    render(<PhoneCustomization data={mockData} addToCart={addToCartMock} />);

    fireEvent.click(screen.getByRole('button', { name: '256 GB' }));
    fireEvent.click(screen.getByRole('button', { name: 'Silver' }));
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(addToCartMock).toHaveBeenCalledWith(1, 1);
  });

  it('marks selected options with aria-pressed', () => {
    render(<PhoneCustomization data={mockData} addToCart={addToCartMock} />);

    const storageButton = screen.getByRole('button', { name: '128 GB' });
    fireEvent.click(storageButton);

    expect(storageButton).toHaveAttribute('aria-pressed', 'true');
  });
});
