import { LocationType } from "@/types/location";
import axios from "axios";
import { useState, useEffect } from "react";

const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export function useLocationSuggestions(
  searchTerm: string,
  debounceDelay = 300
) {
  const [data, setData] = useState<LocationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setData([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<LocationType[]>(
          `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${apiKey}`,
          { signal: controller.signal }
        );

        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message || "Unknown error");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, debounceDelay);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [searchTerm, debounceDelay]);

  return { data, loading, error };
}
