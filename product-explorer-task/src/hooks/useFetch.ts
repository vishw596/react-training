import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    useEffect(() => {
        async function fetchData(url: string) {
            try {
                setLoading(true);
                setError("");
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP STATUS CODE :${response.status}`);
                }
                const data = await response.json();
                setLoading(false);
                setData(data);
            } catch (error: unknown) {
                setLoading(false);
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
        }
        fetchData(url);
    }, [url]);
    return { data, loading, error };
}
