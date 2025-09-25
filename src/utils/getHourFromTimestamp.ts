/**
 * Converts a UNIX timestamp into a formatted hour label ei, 5AM/8AM...
 *
 * @param {number} timestamp - UNIX timestamp in seconds.
 * @returns {string} Formatted hour label in 12-hour format with AM/PM suffix.
 */
export const getHourLabelFromTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  const hours = date.getHours()

  const hour12 = hours % 12 === 0 ? 12 : hours % 12
  const suffix = hours < 12 ? 'AM' : 'PM'

  return `${hour12}${suffix}`
}