import { useEffect, useState } from 'react';

const useDebounce = (value: unknown, delay: number) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [delay, value])

  return debounced;
}

export default useDebounce;