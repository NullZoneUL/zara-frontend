import CartItem from '.';
import { render, screen, fireEvent, act } from '@testing-library/react';

const mockInfo = {
  id: '1',
  image: 'phone.png',
  name: 'Galaxy S24',
  color: 'Negro',
  storage: '128GB',
  price: 999,
  colorHex: '#000',
  timestamp: 1766092932474,
};

describe('CartItem', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders the phone information', () => {
    render(<CartItem info={mockInfo} onDelete={jest.fn()} />);

    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      'Galaxy S24 Negro 128GB',
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Galaxy S24',
    );
    expect(screen.getByText('128GB | Negro')).toBeInTheDocument();
    expect(screen.getByText('999')).toBeInTheDocument();
  });

  it('calls onDelete after 500ms when delete button is clicked', () => {
    const onDeleteMock = jest.fn();

    render(
      <ul>
        <CartItem info={mockInfo} onDelete={onDeleteMock} />
      </ul>,
    );

    const deleteButton = screen.getByRole('button', {
      name: /delete galaxy s24/i,
    });

    fireEvent.click(deleteButton);

    expect(onDeleteMock).not.toHaveBeenCalled();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith('1', '#000', '128GB');
  });
});
