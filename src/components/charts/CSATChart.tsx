import { BaseChart } from './BaseChart'
import { csatChartOptions } from '@/constants/chartDefaults'
import { csatData } from '@/data/mockData'
import { useCSATFilters } from '@/store/dashboardStore'

export function CSATChart() {
  const filters = useCSATFilters()

  return (
    <BaseChart
      data={csatData}
      options={csatChartOptions}
      filters={filters}
    />
  )
}
