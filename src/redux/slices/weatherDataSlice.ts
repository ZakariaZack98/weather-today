import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchCurrentWeather } from "@/utils/fetchCurrentWeather.utils";
import { FetchHourlyForecast } from "@/utils/fetchHourlyForecast.utils";
import { CurrentWeatherDataType } from "@/types/currentWeatherData";
import { WeatherState } from "@/types/weatherState";
import { HourlyForecastDataType } from "@/types/hourlyForecastData";

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

const initialState: WeatherState = {
  recentSearchLoc: [],
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
          if (currentWeatherData.name && currentWeatherData.sys?.country) {
            state.locationName = `${currentWeatherData.name}, ${currentWeatherData.sys.country}`;
          }
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
