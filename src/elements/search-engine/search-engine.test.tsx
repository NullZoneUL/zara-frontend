import SearchEngine from '.';
import { render, screen, fireEvent } from '@testing-library/react';

jest.useFakeTimers();

describe('SearchEngine', () => {
  const onInputMock = jest.fn();

  beforeEach(() => {
    onInputMock.mockClear();
  });

  it('renders search input with accessible label', () => {
    render(<SearchEngine numResults={0} onInput={onInputMock} />);

    const input = screen.getByRole('textbox', { name: /search/i });
    expect(input).toBeInTheDocument();
  });

  it('calls onInput after debounce time', () => {
    render(<SearchEngine numResults={0} onInput={onInputMock} />);

    const input = screen.getByRole('textbox');

    fireEvent.input(input, { target: { value: 'iphone' } });

    expect(onInputMock).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200); // INPUT_TIME_OUT

    expect(onInputMock).toHaveBeenCalledWith('iphone');
  });

  it('shows clear button when typing', () => {
    render(<SearchEngine numResults={0} onInput={onInputMock} />);

    const input = screen.getByRole('textbox');

    fireEvent.input(input, { target: { value: 'iphone' } });

    const clearButton = screen.getByRole('button', {
      name: /clean/i,
    });

    expect(clearButton).toBeVisible();
  });

  it('clears input and calls onInput with empty string', () => {
    render(<SearchEngine numResults={0} onInput={onInputMock} />);

    const input = screen.getByRole('textbox');

    fireEvent.input(input, { target: { value: 'iphone' } });
    jest.advanceTimersByTime(300);

    const clearButton = screen.getByRole('button', {
      name: /clean/i,
    });

    fireEvent.click(clearButton);

    expect(onInputMock).toHaveBeenLastCalledWith('');
    expect((input as HTMLInputElement).value).toBe('');
  });

  it('announces number of results', () => {
    render(<SearchEngine numResults={5} onInput={onInputMock} />);

    const results = screen.getByText(/5/i);
    expect(results).toHaveAttribute('aria-live', 'polite');
  });
});
