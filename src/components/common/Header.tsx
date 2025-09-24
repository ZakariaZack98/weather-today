import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Header = () => {
  return (
    <header className="container mx-auto flex justify-between items-center w-full">
      {/* ============ Logo side ============ */}
      <div className="flex items-center gap-x-3">
        <picture>
          <img
            src="/images/logo/logo-icon.png"
            alt="logo_icon_sun"
            className="h-8 w-8"
          />
        </picture>
        <p className="text-2xl font-semibold">Weather Today</p>
      </div>
      {/* =========== unit side ============= */}
      <Select>
        <SelectTrigger className="w-[140px] bg-transparentBlack border border-gray-700">
          <SelectValue placeholder="🔅 Units" className="text-textGray" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="celcius">Celcius (&deg;C)</SelectItem>
            <SelectItem value="fahrenheit">Fahrenheit (&deg;F)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </header>
  );
};

export default Header;
