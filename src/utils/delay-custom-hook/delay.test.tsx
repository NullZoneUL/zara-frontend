import { renderHook, act } from '@testing-library/react';
import { useDelayedLoading } from './delay';

describe('useDelayedLoading', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should return false initially', () => {
    const { result } = renderHook(() => useDelayedLoading(false, 1500));

    expect(result.current).toBe(false);
  });

  it('should not show loading before delay', () => {
    const { result, rerender } = renderHook(
      ({ loading }) => useDelayedLoading(loading, 1500),
      { initialProps: { loading: false } },
    );

    rerender({ loading: true });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(false);
  });

  it('should show loading after delay', () => {
    const { result, rerender } = renderHook(
      ({ loading }) => useDelayedLoading(loading, 1500),
      { initialProps: { loading: false } },
    );

    rerender({ loading: true });

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(result.current).toBe(true);
  });

  it('should reset loading when loading becomes false', () => {
    const { result, rerender } = renderHook(
      ({ loading }) => useDelayedLoading(loading, 1500),
      { initialProps: { loading: true } },
    );

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(result.current).toBe(true);

    rerender({ loading: false });

    expect(result.current).toBe(false);
  });

  it('should cancel timeout if loading changes before delay', () => {
    const { result, rerender } = renderHook(
      ({ loading }) => useDelayedLoading(loading, 1500),
      { initialProps: { loading: false } },
    );

    rerender({ loading: true });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    rerender({ loading: false });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(false);
  });

  it('should respect custom delay', () => {
    const { result, rerender } = renderHook(
      ({ loading }) => useDelayedLoading(loading, 500),
      { initialProps: { loading: false } },
    );

    rerender({ loading: true });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe(true);
  });
});
