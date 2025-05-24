import { renderHook, act } from '@testing-library/react';
import { useFetch } from '@/hooks';

describe('useFetch', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch data successfully', async () => {
    const mockData = { foo: 'bar' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch({ url: 'https://api.test.com/data' }));

    await act(async () => {
      await result.current.fetchAction();
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useFetch({ url: 'https://api.test.com/data' }));

    await act(async () => {
      await result.current.fetchAction();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toMatch(/Network error/);
    expect(result.current.loading).toBe(false);
  });
});