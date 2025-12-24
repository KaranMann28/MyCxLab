import { BaseChart } from './BaseChart'
import { handoverChartOptions } from '@/constants/chartDefaults'
import { handoverData } from '@/data/mockData'
import { useHandoverFilters } from '@/store/dashboardStore'

export function HandoverChart() {
  const filters = useHandoverFilters()

  return (
    <BaseChart
      data={handoverData}
      options={handoverChartOptions}
      filters={filters}
    />
  )
}
