const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function getFullDate(date: Date): string {
  return (
    MONTHS[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
  )
}

// TODO: add other timezones - right now it is dependent upon where the server the code is running on is
export function getFullDateAndTime(date: Date): string {
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  return getFullDate(date) + ' at ' + time
}
