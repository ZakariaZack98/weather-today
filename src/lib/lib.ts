import { WiThermometer, WiCloudy, WiStrongWind, WiBarometer, WiRaindrops } from "react-icons/wi";

export const WeatherLayers = [
  {
    modeName: 'Temperature',
    keyword: 'temp_new',
    icon: WiThermometer,
    colors: [
      { range: '< -20°C', color: '#00008B' },     // deep blue
      { range: '-20°C to 0°C', color: '#0000FF' }, // blue
      { range: '0°C to 10°C', color: '#00FFFF' },  // cyan
      { range: '10°C to 20°C', color: '#00FF00' }, // green
      { range: '20°C to 30°C', color: '#FFFF00' }, // yellow
      { range: '30°C to 40°C', color: '#FFA500' }, // orange
      { range: '> 40°C', color: '#FF0000' },       // red
    ]
  },
  {
    modeName: 'Precipitation',
    keyword: 'precipitation_new',
    icon: WiRaindrops,
    colors: [
      { range: '0 mm/h', color: '#FFFFFF' },        // white = no rain
      { range: '0.1–1 mm/h', color: '#87CEFA' },    // light blue
      { range: '1–5 mm/h', color: '#4682B4' },      // steel blue
      { range: '5–20 mm/h', color: '#0000CD' },     // medium blue
      { range: '> 20 mm/h', color: '#00008B' },     // dark blue
    ]
  },
  {
    modeName: 'Clouds',
    keyword: 'clouds_new',
    icon: WiCloudy,
    colors: [
      { range: '0–20%', color: '#FFFFFF' },         // clear (white)
      { range: '20–50%', color: '#D3D3D3' },        // light gray
      { range: '50–80%', color: '#A9A9A9' },        // gray
      { range: '80–100%', color: '#696969' },       // dark gray
    ]
  },
  {
    modeName: 'Wind',
    keyword: 'wind_new',
    icon: WiStrongWind,
    colors: [
      { range: '0–2 m/s', color: '#E0FFFF' },       // light cyan
      { range: '2–5 m/s', color: '#f5d7f5' },       // light pink
      { range: '5–10 m/s', color: '#eb96eb' },      // dodger pink
      { range: '10–20 m/s', color: '#b81ab8' },     // medium pink
      { range: '> 20 m/s', color: '#8a0f8a' },      // dark pink
    ]
  },
  {
    modeName: 'Pressure',
    keyword: 'pressure_new',
    icon: WiBarometer,
    colors: [
      { range: '< 980 hPa', color: '#800000' },     // dark red
      { range: '980–1000 hPa', color: '#FFA07A' },  // light salmon
      { range: '1000–1020 hPa', color: '#F0E68C' }, // khaki
      { range: '1020–1040 hPa', color: '#ADFF2F' }, // green yellow
      { range: '> 1040 hPa', color: '#00FF7F' },    // spring green
    ]
  },
]