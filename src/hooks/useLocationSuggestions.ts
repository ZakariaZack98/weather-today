import { LocationType } from '@/types/location';
import { useState, useEffect } from 'react'

const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

export function useLocationSuggestions(searchTerm: string, debounceDelay = 300) {
  const [data, setData] = useState<LocationType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setData([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${apiKey}`,
          { signal: controller.signal }
        )

        if (!res.ok) throw new Error('Failed to fetch suggestions')

        const result = await res.json()
        setData(result)
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unknown error')
        }
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(fetchSuggestions, debounceDelay)
    return () => {
      clearTimeout(debounce)
      controller.abort()
    }
  }, [searchTerm, debounceDelay])

  return { data, loading, error }
}