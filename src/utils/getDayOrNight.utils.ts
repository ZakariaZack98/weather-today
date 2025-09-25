// ? Returns true if it is daytime currenly 
export const isDayTime = () => {
  const currentHour = new Date().getHours();
  return currentHour >= 6 && currentHour < 18;
};