export interface InvestmentHistoryDetail {
  label: string
  value: string
}

export interface InvestmentHistoryItem {
  id: number | string
  createdAt: string
  query: Record<string, string>
  details: InvestmentHistoryDetail[]
}
