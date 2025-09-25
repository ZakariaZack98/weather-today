import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setRecentSearchLoc } from '@/redux/slices/weatherDataSlice'

export const useRecentSearch = () => {
  const dispatch = useAppDispatch()
  const recentSearchLoc = useAppSelector(state => state.weather.recentSearchLoc)

  //* Add a new locaton 
  const addLocation = (location: string) => {
    const updated = Array.from(new Set([location, ...recentSearchLoc])).slice(0, 5)
    dispatch(setRecentSearchLoc(updated))
    localStorage.setItem('recentSearchLoc', JSON.stringify(updated))
  }

  //* Clear all recent searches
  const clearRecentSearch = () => {
    dispatch(setRecentSearchLoc([]))
    localStorage.removeItem('recentSearchLoc')
  }

  return { recentSearchLoc, addLocation, clearRecentSearch }
}