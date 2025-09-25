export const getFormattedTodayDate = (): string => {
  const today = new Date()

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }

  return today.toLocaleDateString('en-US', options)
}