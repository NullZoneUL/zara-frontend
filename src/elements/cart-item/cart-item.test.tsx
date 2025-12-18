import CartItem from '.';
import Translations from '@assets/languages/export';
import { render, screen, fireEvent } from '@testing-library/react';

const mockInfo = {
  id: '1',
  image: 'phone.png',
  name: 'Galaxy S24',
  color: 'Negro',
  storage: '128GB',
  price: 999,
};

describe('CartItem', () => {
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

  it('calls onDelete when delete button is clicked', () => {
    const onDeleteMock = jest.fn();
    render(<CartItem info={mockInfo} onDelete={onDeleteMock} />);

    const deleteButton = screen.getByRole('button', {
      name: Translations.delete,
    });
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith('1');
  });
});
