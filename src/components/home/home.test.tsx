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
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (requestPhoneList as jest.Mock).mockResolvedValueOnce(mockPhones);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByText(/loading phone list/i)).toBeInTheDocument();
  });

  it('renders phone list when request succeeds', async () => {
    (requestPhoneList as jest.Mock).mockResolvedValueOnce(mockPhones);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const section = await screen.findByRole('region', {
      name: /phone list/i,
    });

    expect(section).toBeInTheDocument();
    expect(await screen.findByText('Apple')).toBeInTheDocument();
    expect(await screen.findByText('Samsung')).toBeInTheDocument();

    expect(requestPhoneList).toHaveBeenCalledWith(20, 0, '');
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
