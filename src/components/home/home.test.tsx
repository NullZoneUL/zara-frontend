import Home from '.';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { requestPhoneList } from '@api/client';

jest.mock('@api/client', () => ({
  requestPhoneList: jest.fn(),
}));

const mockPhones = [
  {
    id: '1',
    brand: 'Apple',
    name: 'iPhone 15',
    basePrice: 999,
    imageUrl: 'https://example.com/iphone15.png',
  },
  {
    id: '2',
    brand: 'Samsung',
    name: 'Galaxy S24',
    basePrice: 899,
    imageUrl: 'https://example.com/galaxyS24.png',
  },
];

describe('Home component', () => {
  beforeEach(() => {
    (requestPhoneList as jest.Mock).mockResolvedValue(mockPhones);
  });

  it('renders phone list section landmark', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const section = await screen.findByRole('region', { name: /Phone list/i });
    expect(section).toBeInTheDocument();
    expect(await screen.findByText('Apple')).toBeInTheDocument();
    expect(await screen.findByText('Samsung')).toBeInTheDocument();
  });

  it('renders error message when request fails', async () => {
    (requestPhoneList as jest.Mock).mockRejectedValueOnce(new Error('Fail'));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
  });
});
