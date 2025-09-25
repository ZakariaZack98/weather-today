import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchCurrentWeather } from "@/utils/fetchCurrentWeather.utils";
import { FetchHourlyForecast } from "@/utils/fetchHourlyForecast.utils";
import { CurrentWeatherDataType } from "@/types/currentWeatherData";
import { WeatherState } from "@/types/weatherState";
import { HourlyForecastDataType } from "@/types/hourlyForecastData";

/**
 * TODO: Fetch both current weather amd forecast for the given location and unit type.
 * @returns {CurrentWeatherDataType, HourlyForecastDataType[]} current weather data and an array of hourly forecast data
 * @rejects with rejectvalue if any error occurs
 */
export const fetchAllWeatherData = createAsyncThunk<{ currentWeatherData: CurrentWeatherDataType | null; hourlyForecastData: HourlyForecastDataType[] | null; }, { locationQuery: string; metric: string }, { rejectValue: { message: string } }> (
  "weather/fetchAllWeatherData",
  async ({ locationQuery, metric }, thunkAPI) => {
    try {
      const results = await Promise.allSettled([
        FetchCurrentWeather(locationQuery, metric),
        FetchHourlyForecast(locationQuery, metric),
      ]);

      const [weatherResult, hourlyResult] = results;

      return {
        currentWeatherData: weatherResult.status === "fulfilled" ? weatherResult.value : null,
        hourlyForecastData: hourlyResult.status === "fulfilled" ? hourlyResult.value?.list ?? null : null,
      };
      
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

/**
 * TODO: Retrieves the recently searched locations from the local storage.
 ** If the local storage is not available an empty array is returned.
 * @returns {string[]} An array of recently searched locations.
 */
const getRecentSearchLocFromStorage = (): string[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('recentSearchLoc')
    return stored ? JSON.parse(stored) : []
  }
  return []
}


const initialState: WeatherState = {
  recentSearchLoc: getRecentSearchLocFromStorage(),
  locationName: "Dhaka, Dhaka Division BD",
  coord: [23.8103, 90.4125],
  currentWeatherData: null,
  hourlyForecastData: [],
  status: "idle",
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCoord(state, action: PayloadAction<[number, number]>) {
      state.coord = action.payload;
    },
    setLocationName(state, action: PayloadAction<string>) {
      state.locationName = action.payload;
    },
    setRecentSearchLoc(state, action: PayloadAction<string[]>) {
      state.recentSearchLoc = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('recentSearchLoc', JSON.stringify(action.payload))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWeatherData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { currentWeatherData, hourlyForecastData } = action.payload;

        if (currentWeatherData?.coord) {
          state.coord = [
            currentWeatherData.coord.lat,
            currentWeatherData.coord.lon,
          ];
        }
        if (currentWeatherData) {
          state.currentWeatherData = currentWeatherData;
        }
        state.hourlyForecastData = hourlyForecastData ?? [];
      })
      .addCase(fetchAllWeatherData.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload?.message === "string"
            ? action.payload.message
            : action.error.message ?? null;
      });
  },
});

export const { setCoord, setLocationName, setRecentSearchLoc } = weatherSlice.actions;
export default weatherSlice.reducer;
