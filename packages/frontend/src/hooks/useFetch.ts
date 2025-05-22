import { useEffect, useState } from 'react';

type UseFetchResult<T> = {
    data: T | null;
    error: string | null;
    loading: boolean;
};

export function useFetch<T = unknown>(url: string, options?: RequestInit): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        fetch(url, options)
            .then(async (res) => {
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(errorText || `Error: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (isMounted) setData(data);
            })
            .catch((err) => {
                if (isMounted) setError(err.message || 'Unknown error');
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [options, url]);

    return { data, error, loading };
}