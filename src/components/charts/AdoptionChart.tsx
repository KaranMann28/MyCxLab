import { BaseChart } from './BaseChart'
import { adoptionChartOptions } from '@/constants/chartDefaults'
import { adoptionData } from '@/data/mockData'
import { useAdoptionFilters } from '@/store/dashboardStore'

export function AdoptionChart() {
  const filters = useAdoptionFilters()

  return (
    <BaseChart
      data={adoptionData}
      options={adoptionChartOptions}
      filters={filters}
    />
  )
}
