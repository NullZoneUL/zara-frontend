import PhoneItem from '.';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const mockItem = {
  brand: 'Apple',
  name: 'iPhone 15',
  basePrice: 999,
  imageUrl: 'https://example.com/iphone15.png',
  id: '1',
};

describe('PhoneItem', () => {
  it('renders link with correct aria-label', () => {
    render(
      <MemoryRouter>
        <PhoneItem itemInfo={mockItem} />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', {
      name: /Go to product info page. Apple iPhone 15/i,
    });
    expect(link).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(
      <MemoryRouter>
        <PhoneItem itemInfo={mockItem} />
      </MemoryRouter>,
    );
    const img = screen.getByAltText('Apple iPhone 15');
    expect(img).toBeInTheDocument();
  });

  it('renders brand, name and price', () => {
    render(
      <MemoryRouter>
        <PhoneItem itemInfo={mockItem} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('999')).toBeInTheDocument();
  });
});
