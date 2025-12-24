import { create } from 'zustand'
import type { FilterOption } from '@/types'
import {
  adoptionFilters,
  csatFilters,
  handoverFilters,
  revenueFilters,
} from '@/data/mockData'

interface ChartFiltersState {
  adoption: FilterOption[]
  csat: FilterOption[]
  handover: FilterOption[]
  revenue: FilterOption[]
}

interface DashboardState {
  // Filter state for each chart
  chartFilters: ChartFiltersState

  // Actions
  toggleFilter: (chartId: keyof ChartFiltersState, filterId: string) => void
  resetFilters: (chartId: keyof ChartFiltersState) => void
  resetAllFilters: () => void
}

const initialFilters: ChartFiltersState = {
  adoption: adoptionFilters,
  csat: csatFilters,
  handover: handoverFilters,
  revenue: revenueFilters,
}

export const useDashboardStore = create<DashboardState>((set) => ({
  chartFilters: initialFilters,

  toggleFilter: (chartId, filterId) =>
    set((state) => ({
      chartFilters: {
        ...state.chartFilters,
        [chartId]: state.chartFilters[chartId].map((filter) =>
          filter.id === filterId
            ? { ...filter, checked: !filter.checked }
            : filter
        ),
      },
    })),

  resetFilters: (chartId) =>
    set((state) => ({
      chartFilters: {
        ...state.chartFilters,
        [chartId]: initialFilters[chartId],
      },
    })),

  resetAllFilters: () =>
    set({
      chartFilters: initialFilters,
    }),
}))

// Selector hooks for specific charts
export const useAdoptionFilters = () =>
  useDashboardStore((state) => state.chartFilters.adoption)

export const useCSATFilters = () =>
  useDashboardStore((state) => state.chartFilters.csat)

export const useHandoverFilters = () =>
  useDashboardStore((state) => state.chartFilters.handover)

export const useRevenueFilters = () =>
  useDashboardStore((state) => state.chartFilters.revenue)
