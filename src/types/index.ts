// Chart data types
export interface ChartDataset {
  label: string
  data: number[]
  borderColor: string
  backgroundColor: string
  tension?: number
  fill?: boolean
  yAxisID?: string
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

// Adoption data
export interface AdoptionDataPoint {
  month: string
  humanResolved: number
  aiFullyResolved: number
  aiHandover: number
  flowResolved: number
}

// CSAT data
export interface CSATDataPoint {
  quarter: string
  resolutionType: 'human' | 'ai_fully_resolved' | 'ai_overall' | 'flow'
  avgCsat: number
}

// Handover data
export interface HandoverDataPoint {
  month: string
  handoverPct: number
  fullyAutoPct: number
}

// Revenue data
export interface RevenueDataPoint {
  month: string
  revenueInfluencedM: number
  totalGmvM: number
}

// Filter types
export interface FilterOption {
  id: string
  label: string
  datasetIndex: number
  color: string
  checked: boolean
}

// Stat card types
export interface StatData {
  number: string
  label: string
}

// Insight box types
export interface InsightData {
  title: string
  content: string
}

// Section config for scalable dashboard
export interface SectionConfig {
  id: string
  title: string
  chartType: 'adoption' | 'csat' | 'handover' | 'revenue'
  insight: InsightData
  keyFinding: string
  methodology: string
  filters: FilterOption[]
}

// Dashboard config for multiple dashboards
export interface DashboardConfig {
  id: string
  slug: string
  title: string
  subtitle: string
  stats: StatData[]
  sections: SectionConfig[]
}
