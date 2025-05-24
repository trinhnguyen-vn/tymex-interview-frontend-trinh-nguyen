import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'a', delay: 500 } }
    );

    expect(result.current).toBe('a');

    // Change value
    rerender({ value: 'b', delay: 500 });
    expect(result.current).toBe('a'); // Not updated yet

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('b');
  });
});