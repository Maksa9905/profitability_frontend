export const useNavigationItems = () => {
  return [
    {
      label: $t('toolItem.deposits.label'),
      icon: 'i-lucide-landmark',
      to: '/tools/deposit',
    },
    {
      label: $t('toolItem.bonds.label'),
      icon: 'i-lucide-wallet',
      to: '/tools/bonds',
    },
    {
      label: $t('toolItem.stocks.label'),
      icon: 'i-lucide-chart-candlestick',
      to: '/tools/stocks',
    },
  ];
}