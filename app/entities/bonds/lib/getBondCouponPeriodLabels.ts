import type { components } from '~/shared/api/generated/invest'

type BondFrequency = components['schemas']['BondResponse']['frequency']

function addMonths(base: Date, months: number): Date {
  const d = new Date(base)
  d.setMonth(d.getMonth() + months)
  return d
}

function startOfMonth(d: Date): Date {
  const x = new Date(d)
  x.setDate(1)
  x.setHours(0, 0, 0, 0)
  return x
}

function formatMonthYear(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric'
  }).format(d)
}

function formatQuarter(d: Date, locale: string): string {
  const q = Math.floor(d.getMonth() / 3) + 1
  const y = d.getFullYear()
  if (locale.startsWith('ru')) {
    return `${q} кв. ${y}`
  }
  return `Q${q} ${y}`
}

function formatSemiAnnual(d: Date, locale: string): string {
  const half = d.getMonth() < 6 ? 1 : 2
  const y = d.getFullYear()
  if (locale.startsWith('ru')) {
    return `${half} пг. ${y}`
  }
  return `H${half} ${y}`
}

function formatYear(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(d)
}

export function getBondCouponPeriodLabels(
  pointCount: number,
  frequency: BondFrequency,
  locale: string
): string[] {
  if (pointCount <= 0) {
    return []
  }

  const now = new Date()
  const labels: string[] = []

  if (frequency === 'MONTHLY') {
    const start = startOfMonth(now)
    for (let i = 0; i < pointCount; i++) {
      labels.push(formatMonthYear(addMonths(start, i), locale))
    }
    return labels
  }

  if (frequency === 'QUARTERLY') {
    const m = now.getMonth()
    const qStartMonth = Math.floor(m / 3) * 3
    const start = new Date(now.getFullYear(), qStartMonth, 1)
    start.setHours(0, 0, 0, 0)
    for (let i = 0; i < pointCount; i++) {
      labels.push(formatQuarter(addMonths(start, i * 3), locale))
    }
    return labels
  }

  if (frequency === 'SEMI_ANNUALLY') {
    const y = now.getFullYear()
    const m = now.getMonth()
    const start = m < 6 ? new Date(y, 0, 1) : new Date(y, 6, 1)
    start.setHours(0, 0, 0, 0)
    for (let i = 0; i < pointCount; i++) {
      labels.push(formatSemiAnnual(addMonths(start, i * 6), locale))
    }
    return labels
  }

  const startYear = new Date(now.getFullYear(), 0, 1)
  startYear.setHours(0, 0, 0, 0)
  for (let i = 0; i < pointCount; i++) {
    labels.push(formatYear(addMonths(startYear, i * 12), locale))
  }

  return labels
}
