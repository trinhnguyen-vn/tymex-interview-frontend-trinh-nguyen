import { useCallback, useState } from 'react';

type UseFetchProps = {
    url?: string;
    options?: RequestInit;
}
type UseFetchResult<T> = {
    data: T | null;
    error: string | null;
    loading: boolean;
    fetchAction: (params?: UseFetchProps) => Promise<void>;
};

export const useFetch = <T = unknown>(params: UseFetchProps): UseFetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { url, options } = params;

    const fetchData = useCallback(async (params: UseFetchProps = {}) => {
        const { url: fetchUrl, options: fetchOptions } = params;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(fetchUrl || url || '', fetchOptions || options || {})
            if (res.ok) {
                const data = await res.json()
                setData(data)
            } else {
                const errorText = await res.text();
                throw new Error(errorText || `Error: ${res.status}`);
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
        finally {
            setLoading(false);
        }

    }, [options, url]);

    return { data, error, loading, fetchAction: fetchData };
}
