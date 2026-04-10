/**
 * `PrimaryColorProvider` задаёт `--ui-primary` на `.primary-color-provider`, не на `:root`.
 * Графики (ECharts) получают цвет из JS — читаем переменную у предка-провайдера.
 */
export function resolveUiPrimaryForChart(
  hostElement: Element | null | undefined,
  /** Палитра инструмента на :root, если компонент не внутри провайдера */
  rootFallbackVar: string
): string {
  if (import.meta.server || !hostElement) {
    return ''
  }
  const scope = hostElement.closest('.primary-color-provider') ?? hostElement
  const fromProvider = getComputedStyle(scope)
    .getPropertyValue('--ui-primary')
    .trim()
  if (fromProvider) {
    return fromProvider
  }
  return getComputedStyle(document.documentElement)
    .getPropertyValue(rootFallbackVar)
    .trim()
}
