"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { useLocationSuggestions } from "@/hooks/useLocationSuggestions";
import LocationResultCard from "./LocationResultCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAllWeatherData,
} from "@/redux/slices/weatherDataSlice";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { easeOut, motion } from 'framer-motion';

countries.registerLocale(enLocale);

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: suggestions, error } = useLocationSuggestions(searchTerm);
  const unit = useAppSelector((state) => state.unit.value);
  const dispatch = useAppDispatch();

  const revealVariants = {
    hidden: {
      opacity: 0,
      maxHeight: 0,
    },
    visible: {
      opacity: 1,
      maxHeight: '2em', 
      transition: {
        duration: 1.5,
        ease: easeOut,
      },
    },
  }

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(capitalizeFirst(e.target.value));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setSearchTerm("");
    e.preventDefault();
    dispatch(
      fetchAllWeatherData({ locationQuery: searchTerm, unitSystem: unit })
    );
    //! Geocoding needed
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      setSearchTerm("");
      dispatch(
        fetchAllWeatherData({ locationQuery: searchTerm, unitSystem: unit })
      );
      //! GeoCoding needed
      // dispatch(setLocationName(`${name}, ${state ? `${state}, `: ''}${countries.getName(country, 'en') || country}`))
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-8 sm:gap-4 2xl:gap-8 my-10 xl:my-6 2xl:my-8">
      <motion.h4
      variants={revealVariants}
      initial="hidden"
      animate="visible"
      className="overflow-hidden font-light text-xl md:text-3xl 2xl:text-4xl text-center"
    >
      {`How's the sky looking today?`}
    </motion.h4>
  
      {/* =====================search area ======================= */}
      <form
        className="flex items-center justify-center gap-3 relative w-full sm:w-4/5 lg:w-1/2 mx-auto"
        onSubmit={handleSearch}
      >
        <Input
          type="text"
          placeholder="Search for a place"
          value={searchTerm}
          className="ps-10 bg-transparentBlack border border-gray-700 h-11 font-inter rounded-[8px]"
          onChange={(e) => handleSearchTermChange(e)}
          onKeyDown={handleEnter}
        />
        <SearchIcon className="absolute left-3 w-5 text-black top-1/2 -translate-y-[50%]" />
        {/* ------------ suggestion list ================ */}
        {suggestions && suggestions.length > 0 && (
          <div
            className="absolute w-full left-0 top-14 rounded-md overflow-hidden shadow-2xl border border-gray-500 flex flex-col "
            onClick={() => setSearchTerm("")}
          >
            {suggestions.map((location) => (
              <LocationResultCard key={location.lat} locationData={location} />
            ))}
            {/* ============ error component ================= */}
            {error && (
              <div className="h-40 w-full flex justify-center items-center bg-yellow absolute top-14 left-0">
                <p className="text-black">Error fetching location: {error === 'city not found' ? 'City not found. Please enter a valid city name and try again.': error}</p>
              </div>
            )}
          </div>
        )}
        <Button
          type="submit"
          size={"lg"}
          className="bg-btnBlue rounded-[8px] text-white text-sm sm:text-base"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default Search;
