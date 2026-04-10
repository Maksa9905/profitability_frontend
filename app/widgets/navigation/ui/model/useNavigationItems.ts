import { EToolItem, toolsIcons } from '~/features/investment-tools'

export const useNavigationItems = () => {
  const { t } = useI18n()

  return [
    {
      label: t('toolItem.deposits.label'),
      icon: toolsIcons[EToolItem.DEPOSIT],
      to: '/tools/deposit'
    },
    {
      label: t('toolItem.bonds.label'),
      icon: toolsIcons[EToolItem.BOND],
      to: '/tools/bonds'
    },
    {
      label: t('toolItem.stocks.label'),
      icon: toolsIcons[EToolItem.STOCK],
      to: '/tools/stocks'
    }
  ]
}
