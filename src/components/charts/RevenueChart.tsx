import { BaseChart } from './BaseChart'
import { revenueChartOptions } from '@/constants/chartDefaults'
import { revenueData } from '@/data/mockData'
import { useRevenueFilters } from '@/store/dashboardStore'

export function RevenueChart() {
  const filters = useRevenueFilters()

  return (
    <BaseChart
      data={revenueData}
      options={revenueChartOptions}
      filters={filters}
    />
  )
}
