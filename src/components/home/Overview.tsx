import React from "react";

const LocationAndTemp = () => {

  //mockdata =====================
  const mockData = [
    {
      label: 'Feels Like',
      value: '20 &deg;'
    },
    {
      label: 'Humidity',
      value: '80%'
    },
    {
      label: 'Wind',
      value: '5.2km/h'
    },
    {
      label: 'Precipitation',
      value: '0mm'
    },
  ]


  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="rounded-2xl flex flex-col gap-6 p-8" style={{background: 'linear-gradient(165deg,rgba(41, 98, 235, 1) 0%, rgba(143, 52, 233, 1) 95%)'}}>
        {/* ====================== location and date ============================= */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-2xl">{`Dhaka, Bangladesh`}</h4>
            <p className="text-sm text-[#DBEAFE]">{`Tuesday, Aug 5, 2025`}</p>
          </div>
          <span className="text-3xl">📍</span>
        </div>
        {/* ====================== icon and temperature ============================= */}
        <div className="flex justify-between">
          <span className="text-3xl">{`🌞`}</span>
          <h1 className="font-light text-7xl">{"20"}&deg;</h1>
        </div>
      </div>
      {/* ========================== Other updates ================================= */}
      <div className="grid grid-cols-4 w-full gap-4">
        {
          mockData?.map(data => (
            <div className="p-4 rounded-2xl bg-transparentBlack flex flex-col gap-2">
              <p className="text-sm text-textGray">{data.label}</p>
              <h5 className="text-2xl">{data.value}</h5>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default LocationAndTemp;
