export function getFullDate(date: Date): string {
  const month = [
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
    'Dev',
  ]

  return (
    month[date.getMonth()] + ' ' + date.getDay() + ', ' + date.getFullYear()
  )
}
