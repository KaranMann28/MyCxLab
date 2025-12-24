import { useMemo } from 'react'
import { useDashboardStore } from '@/store/dashboardStore'
import type { ChartData } from '@/types'

type ChartId = 'adoption' | 'csat' | 'handover' | 'revenue'

export function useChartFilters(chartId: ChartId) {
  const chartFilters = useDashboardStore((state) => state.chartFilters)
  const toggleFilter = useDashboardStore((state) => state.toggleFilter)

  const filters = chartFilters[chartId]

  const handleToggle = (filterId: string) => {
    toggleFilter(chartId, filterId)
  }

  const activeDatasetIndices = useMemo(
    () => filters.filter((f) => f.checked).map((f) => f.datasetIndex),
    [filters]
  )

  return {
    filters,
    handleToggle,
    activeDatasetIndices,
  }
}

export function useFilteredChartData<T extends ChartData>(
  data: T,
  chartId: ChartId
): T {
  const { activeDatasetIndices } = useChartFilters(chartId)

  return useMemo(
    () => ({
      ...data,
      datasets: data.datasets.filter((_, index) =>
        activeDatasetIndices.includes(index)
      ),
    }),
    [data, activeDatasetIndices]
  ) as T
}
