import PhoneSlideShow from '.';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('@elements/phone-item', () => ({
  __esModule: true,
  default: ({ itemInfo }: any) => (
    <div data-testid="phone-item">{itemInfo.name}</div>
  ),
}));

const mockPhones = [
  {
    brand: 'Apple',
    name: 'iPhone 15',
    basePrice: 999,
    imageUrl: 'https://example.com/iphone15.png',
    id: '1',
  },
  {
    brand: 'Samsung',
    name: 'S24',
    basePrice: 899,
    imageUrl: 'https://example.com/samsungs24.png',
    id: '3',
  },
];

describe('PhoneSlideShow component', () => {
  it('renders slideshow section landmark', () => {
    const { container } = render(
      <MemoryRouter>
        <PhoneSlideShow data={mockPhones} />
      </MemoryRouter>,
    );

    expect(
      container.getElementsByClassName('phone-list-slideshow').length,
    ).toBe(1);
  });

  it('renders a list of phone items', () => {
    const { container } = render(
      <MemoryRouter>
        <PhoneSlideShow data={mockPhones} />
      </MemoryRouter>,
    );

    expect(
      container.getElementsByClassName('phone-list-slideshow-overflow').length,
    ).toBe(1);

    const items = screen.getAllByTestId('phone-item');
    expect(items).toHaveLength(2);
  });
});
