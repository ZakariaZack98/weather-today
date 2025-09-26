
## Weather Today — README

A small, responsive Next.js weather app that shows current weather, hourly and daily forecasts, supports search with suggestions, stores recent searches in localStorage, and lets users choose metric/imperial units.

Below are quick setup steps, environment variables, key features, structure notes, and troubleshooting tips so you can run and extend the project locally.

## Quick Start (development)

Prerequisites
- Node.js 18+ (recommended)
- npm (bundled with Node)  
Clone the repo and install:

```bash
git clone <your-repo-url>
cd weather-today
npm install
```

Create a .env.local in the project root and add your OpenWeather API key and optional endpoints. Example:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here
# optional overrides:
NEXT_PUBLIC_WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5/weather
NEXT_PUBLIC_FORECAST_BASE_URL=https://api.openweathermap.org/data/2.5/forecast
```

Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000

## Build / Production

Create an optimized production build:

```bash
npm run build
npm start   # runs next start
```

Note: project scripts use Turbopack flags:
- `npm run dev` → `next dev --turbopack`
- `npm run build` → `next build --turbopack`

## Available npm scripts

- `npm run dev` — Start dev server (with Turbopack).
- `npm run build` — Build production assets.
- `npm start` — Start the production server (after build).
- `npm run lint` — Run ESLint.

## Environment variables

- `NEXT_PUBLIC_OPENWEATHER_API_KEY` (required) — API key for OpenWeather geocoding / weather endpoints.
- `NEXT_PUBLIC_WEATHER_BASE_URL` (optional) — override default current-weather endpoint.
- `NEXT_PUBLIC_FORECAST_BASE_URL` (optional) — override default forecast endpoint.

These are read by the code in `src/utils/*` and useLocationSuggestions.ts.

## Key features

- Search for cities (with geocoding suggestions) — typed search queries call OpenWeather geocoding API through useLocationSuggestions.ts.
- Recent searches — saved to localStorage and surfaced across sessions (logic in weatherDataSlice.ts).
- Current weather display — CurrentWeatherDisplay.tsx shows location, date, icon and key stats.
- Hourly & daily forecasts — grouped and presented in `HourlyForecast`, `DailyForecast`, and `DailyForecastMobile` components with responsive layouts.
- Units toggle — Metric / Imperial options via a Select in Header.tsx that updates Redux unit slice (unitSlice.ts).
- Loader / animations — a loading UI exists during data fetches; (original project included Lottie animations).
- State management — Redux Toolkit with slices in slices and typed hooks in hooks.ts.
- Typescript — project uses typed declarations in types.
- Responsive & accessible UI — tailwind-based layout and components under components.
- Weather Map (Leaflet) — interactive map showing current coordinates + OpenWeather tile layers
- Statistics Chart (Chart.js / react-chartjs-2) — line charts for hourly statistics and optional secondary series (e.g., feels-like or gusts)

## Project structure (high-level)

- app — Next.js app entry: page.tsx, layout.tsx, global CSS.
- components — UI components, grouped by `home/`, `common/`, `ui/`.
- redux — Redux store, provider, and slices.
- hooks — custom hooks (search suggestions, recent search helper).
- utils — API fetch helpers and util functions.
- animations — Lottie JSON assets (used for animated loader).
- package.json — dependencies & scripts.

## Notes on 7 day forecast

- Openweathermap API free tier only provides upto 5 days of forecast (through 3 hours step chunk) so 5 days forecast is implemented instead of 7 days.

## Implementation notes (Map and Chart)
Leaflet & Next.js

- Leaflet manipulates DOM and must be used from client components only.
- Marker icon images are loaded from images. If markers are missing, ensure the images exist there and Leaflet default icon options are correctly configured.
- Map center coordinates are read from Redux state (state.weather.coord). The component guards against missing coords.
Chart behavior
- LineChart supports an optional secondary dataset. Current behavior shows the secondary line only for certain activeMode values (e.g., "Overview" and "Wind") — check LineChart.tsx for the conditional that adds the secondary dataset to datasets.
- Chart gradients and color groups are defined in lib.ts.

## Notes on Lottie / Server-side rendering (important troubleshooting)

During build or prerendering you may encounter:
- `ReferenceError: document is not defined`

This error happens when a library tries to access browser-only globals (`document`/`window`) while Next.js is rendering on the server. The project originally used Lottie (client-only) for a loader. To avoid this:

- Ensure any component that imports browser-only packages (like `@lottiefiles/react-lottie-player`, `lottie-web`, etc.) is only used client-side.
- Mark client-only components with `"use client"` at the top and dynamically import them with `next/dynamic(..., { ssr: false })`, or import the module inside a `useEffect` on the client.
- Example safe pattern:
  - `const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then(m => m.Player), { ssr: false })`
  - Or import inside `useEffect` and render a simple fallback during SSR.

If you see the error while building:
- Verify WeatherLoader.tsx (loader) does NOT top-level-import Lottie or run `document`-dependent code on import.
- Prefer dynamic client-only import or a plain CSS spinner in the loader.

(There is a loader component in WeatherLoader.tsx — if you prefer a non-Lottie fallback during builds, replace it with a simple spinner.)

## Troubleshooting checklist

- Build error `document is not defined`:
  - Search for any `document`/`window` usage in the codebase.
  - Ensure packages that access DOM are only imported client-side.
- API errors:
  - Confirm `NEXT_PUBLIC_OPENWEATHER_API_KEY` is set in .env.local.
  - Check rate limits or invalid API key responses from OpenWeather.
- Styling issues:
  - Ensure Tailwind is configured and globals.css is imported (layout.tsx).
- Lint/type issues:
  - Run `npm run lint` and address reported problems; TypeScript types are enforced by the build.

## Where to change behavior

- Fetching logic: fetchCurrentWeather.utils.ts and fetchHourlyForecast.utils.ts
- Redux state & actions: weatherDataSlice.ts and unitSlice.ts
- Search bar & suggestions: Search.tsx and useLocationSuggestions.ts
- Loader animation: WeatherLoader.tsx (client-only concerns)

## Contributing / Extending

- Add new UI under components.
- Keep browser-only imports behind client-only boundaries.
- Add types under types when adding new data shapes.
- Tests are not present; consider adding unit tests for utils and components.

## Final notes

- This project uses Next.js (app directory), TypeScript, Tailwind (v4), Redux Toolkit, and Lottie animation (optional).
- If you want to remove Lottie entirely, remove the dependency entries in package.json (`@lottiefiles/react-lottie-player`, `lottie-react`, `lottie-web`) and replace the loader with a simple CSS spinner.