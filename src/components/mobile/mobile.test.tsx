import MobileView from '.';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import { requestPhoneInfo } from '@api/client';

jest.mock('@api/client', () => ({
  requestPhoneInfo: jest.fn(),
}));

jest.mock('@elements/phone-customization', () => () => (
  <div data-testid="customization" />
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

    render(
      <MemoryRouter>
        <MobileView id={1} />
      </MemoryRouter>,
    );

    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders phone information when data is loaded', async () => {
    (requestPhoneInfo as jest.Mock).mockResolvedValue(mockPhone);

    render(
      <MemoryRouter>
        <MobileView id={1} />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole('region', {
        name: /phone information/i,
      }),
    ).toBeInTheDocument();

    expect(await screen.findByTestId('customization')).toBeInTheDocument();

    expect(
      await screen.findByRole('heading', { name: /specifications/i }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('heading', { name: /similar items/i }),
    ).toBeInTheDocument();
  });

  it('renders error message when request fails', async () => {
    (requestPhoneInfo as jest.Mock).mockRejectedValueOnce(new Error('Fail'));

    render(
      <MemoryRouter>
        <MobileView id={1} />
      </MemoryRouter>,
    );

    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
  });
});
