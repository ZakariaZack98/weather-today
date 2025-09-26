// * CONVERT ISO TIME STRING TO LOCAL AM/PM TIME
export const ConvertTo12Hour = (time24: string) => {
  const [hours] = time24?.split(":");
  const hour = parseInt(hours);

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12} ${period}`;
};