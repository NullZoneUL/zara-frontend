import TopBar from '.';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('@api/client', () => ({
  requestPhoneList: jest.fn(),
  requestPhoneInfo: jest.fn(),
}));

describe('TopBar', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>,
    );

  it('renders header landmark', () => {
    renderComponent();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders navigation landmark', () => {
    renderComponent();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders logo link', () => {
    renderComponent();
    const logoLink = screen.getByRole('link', {
      name: /return home/i,
    });
    expect(logoLink).toBeInTheDocument();
  });

  it('renders cart link', () => {
    renderComponent();
    const cartLink = screen.getByRole('link', {
      name: /go to cart/i,
    });
    expect(cartLink).toBeInTheDocument();
  });

  it('shows cart count', () => {
    renderComponent();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('cart count has aria-live', () => {
    renderComponent();
    const count = screen.getByText('0');
    expect(count).toHaveAttribute('aria-live', 'polite');
  });
});
