import { colors } from '@/constants/colors'
import type { ChartData } from '@/types'

interface BigQueryAdoptionRow {
  month: string
  human_resolved: number
  ai_fully_resolved: number
  ai_handover: number
  flow_resolved: number
}

/**
 * Transform BigQuery adoption data to Chart.js format
 */
export function transformAdoptionData(
  rawData: BigQueryAdoptionRow[]
): ChartData {
  const labels = rawData.map((row) => {
    const date = new Date(row.month)
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
  })

  return {
    labels,
    datasets: [
      {
        label: 'Human Resolved',
        data: rawData.map((row) => row.human_resolved / 1000),
        borderColor: colors.human,
        backgroundColor: colors.humanBg,
        tension: 0.4,
      },
      {
        label: 'AI Fully Resolved',
        data: rawData.map((row) => row.ai_fully_resolved / 1000),
        borderColor: colors.aiResolved,
        backgroundColor: colors.aiResolvedBg,
        tension: 0.4,
      },
      {
        label: 'AI Handover',
        data: rawData.map((row) => row.ai_handover / 1000),
        borderColor: colors.aiHandover,
        backgroundColor: colors.aiHandoverBg,
        tension: 0.4,
      },
      {
        label: 'Flow Resolved',
        data: rawData.map((row) => row.flow_resolved / 1000),
        borderColor: colors.flow,
        backgroundColor: colors.flowBg,
        tension: 0.4,
      },
    ],
  }
}
