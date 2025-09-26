"use client";
import { WeatherLayers } from "@/lib/lib";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
} from "react-leaflet";
import { useAppSelector } from "@/redux/hooks";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

//? Local types of weather layer
interface ColorRange {
  range: string;
  color: string;
}
interface WeatherLayer {
  modeName: string;
  keyword: string;
  icon: React.ElementType;
  colors: ColorRange[];
}

//? Next-js map pointer icon fix==================================
declare module "leaflet" {
  interface DefaultIcon {
    _getIconUrl?: () => string;
  }
}
delete (L.Icon.Default.prototype as L.DefaultIcon)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
  iconUrl: "/leaflet/images/marker-icon.png",
  shadowUrl: "/leaflet/images/marker-shadow.png",
});

const WeatherMap = () => {
  const coord = useAppSelector(
    (state) => state.weather.coord
  ) as [number, number] | null;

  const [weatherMapMode, setWeatherMapMode] = useState<string>(
    WeatherLayers[0].modeName
  );
  const [selectedLayer, setSelectedLayer] = useState<WeatherLayer>(
    WeatherLayers[0]
  );

  useEffect(() => {
    const layer = WeatherLayers.find(
      (layer) => layer.modeName === weatherMapMode
    );
    if (layer) setSelectedLayer(layer);
  }, [weatherMapMode]);

  //? component to handle map events and center the map
  const LocationMarker: React.FC = () => {
    const map = useMap();

    useEffect(() => {
      if (coord) {
        map.setView(coord as LatLngExpression, map.getZoom());
      }
    }, [map]);

    return coord ? <Marker position={coord as LatLngExpression} /> : null;
  };

  if (!coord) return <div>No coordinates available</div>;

  return (
    <div className="relative w-full h-120 rounded-md overflow-hidden my-10">
      {/* =============================== Mode Selection Buttons ============================== */}
      <div
        className="mapMode z-50 absolute top-3 right-3 flex flex-col gap-y-2 border border-[rgba(0,0,0,0.3)] bg-white p-1.5"
        style={{
          zIndex: 1000,
          borderRadius: "8px",
          pointerEvents: "auto",
        }}
      >
        {WeatherLayers?.map((layer) => (
          <span
            key={layer.modeName}
            className={`w-7 h-7 rounded flex justify-center items-center text-3xl duration-300 cursor-pointer ${
              weatherMapMode === layer.modeName
                ? "text-white bg-[#000000a4]"
                : "hover:bg-[rgba(0,0,0,0.18)] text-black"
            }`}
            title={layer.modeName}
            onClick={() => setWeatherMapMode(layer.modeName)} // ✅ update state
          >
            {React.createElement(layer.icon)}
          </span>
        ))}
      </div>

      {/* =============================== Map Container ========================================== */}
      <MapContainer
        center={coord as LatLngExpression}
        zoom={10}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ position: "relative", zIndex: 0 }}
      >
        {/* Base OSM Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Weather Layer */}
        {selectedLayer && (
          <TileLayer
            url={`https://tile.openweathermap.org/map/${selectedLayer.keyword}/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`}
            opacity={1}
          />
        )}

        <LocationMarker />
      </MapContainer>

      {/*  ===============================   Legends =========================================== */}
      <div className="legends absolute bottom-3 left-3 border-2 p-3 flex lg:justify-end justify-between md:gap-x-5 2xl:flex-nowrap flex-wrap gap-3 rounded-xl z-50 bg-transparentBlack backdrop-blur-2xl text-xs mx-auto">
        {selectedLayer?.colors?.map((color) => (
          <div key={color.color} className="flex gap-x-2">
            <div
              style={{ backgroundColor: color.color }}
              className="h-3 w-3 rounded-full"
            ></div>
            <p>{color.range}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherMap;
