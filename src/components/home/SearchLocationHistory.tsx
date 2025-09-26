import { useRecentSearch } from "@/hooks/useRecentSearch";
import React from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllWeatherData, setLocationName } from "@/redux/slices/weatherDataSlice";

type SearchLocationHistoryProps = {
  onClose?: () => void
}


const SearchLocationHistory = ({onClose}: SearchLocationHistoryProps) => {
  const { recentSearchLoc, clearRecentSearch } = useRecentSearch();
  const unit = useAppSelector(state => state.unit.value);
  const dispatch = useAppDispatch();

  const handleRevisit = (location:string) => {
    dispatch(fetchAllWeatherData({locationQuery: location.split(',')[0], unitSystem: unit}));
    dispatch(setLocationName(location))
    onClose?.();
  }

  return (
    <div className="flex flex-col gap-4 text-white">
      <h5 className="font-semibold border-b border-gray-500 pb-2">Recent search</h5>
      <div className="flex flex-col">
        {recentSearchLoc?.map((location) => (
          <p
            key={location}
            className=" hover:bg-purple-950 p-2 cursor-pointer rounded-md duration-200 text-textGray text-sm"
            onClick={() => handleRevisit(location)}
          >
            {location}
          </p>
        ))}
      </div>
      <Button type="button" className="bg-red-500 hover:bg-red-900 cursor-pointer" onClick={() =>{ 
        dispatch(clearRecentSearch);
        onClose?.();
        }}>Clear history</Button>
    </div>
  );
};

export default SearchLocationHistory;
