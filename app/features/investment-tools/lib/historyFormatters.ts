export function resolveHistoryLocale(locale: string) {
  return locale === 'en' ? 'en-US' : 'ru-RU'
}

export function formatHistoryDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(resolveHistoryLocale(locale), {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(date))
}

export function formatHistoryNumber(value: number, locale: string) {
  return new Intl.NumberFormat(resolveHistoryLocale(locale), {
    maximumFractionDigits: 2
  }).format(value)
}

export function formatHistoryPercent(value: number, locale: string) {
  return `${formatHistoryNumber(value, locale)}%`
}
