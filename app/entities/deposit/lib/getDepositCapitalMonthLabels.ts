export function getDepositCapitalMonthLabels(
  pointCount: number,
  locale: string
): string[] {
  if (pointCount <= 0) {
    return []
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric'
  })

  const labels: string[] = []
  const start = new Date()
  start.setDate(1)
  start.setHours(0, 0, 0, 0)

  for (let i = 0; i < pointCount; i++) {
    const d = new Date(start)
    d.setMonth(d.getMonth() + i)
    labels.push(formatter.format(d))
  }

  return labels
}
