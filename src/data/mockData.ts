import { colors } from '@/constants/colors'
import type { ChartData, StatData, FilterOption } from '@/types'

// Stats data
export const statsData: StatData[] = [
  {
    number: '312%',
    label: 'Growth in AI-resolved tickets (2024-2025)',
  },
  {
    number: '4.8/5',
    label: 'Average CSAT for fully automated tickets',
  },
  {
    number: '$47M',
    label: 'GMV influenced by AI shopping assistant',
  },
]

// Adoption chart data
export const adoptionData: ChartData = {
  labels: [
    'Jan 24', 'Feb 24', 'Mar 24', 'Apr 24', 'May 24', 'Jun 24',
    'Jul 24', 'Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24',
    'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25',
    'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25'
  ],
  datasets: [
    {
      label: 'Human Resolved',
      data: [850, 840, 855, 860, 845, 850, 855, 860, 865, 850, 845, 840, 835, 830, 825, 820, 815, 810, 805, 800, 795, 790, 785, 780],
      borderColor: colors.human,
      backgroundColor: colors.humanBg,
      tension: 0.4,
    },
    {
      label: 'AI Fully Resolved',
      data: [45, 52, 61, 72, 85, 98, 115, 132, 148, 162, 175, 188, 198, 206, 213, 218, 222, 225, 228, 230, 232, 233, 234, 235],
      borderColor: colors.aiResolved,
      backgroundColor: colors.aiResolvedBg,
      tension: 0.4,
    },
    {
      label: 'AI Handover',
      data: [15, 18, 22, 26, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65, 67, 70, 72, 74, 76, 78, 80, 82],
      borderColor: colors.aiHandover,
      backgroundColor: colors.aiHandoverBg,
      tension: 0.4,
    },
    {
      label: 'Flow Resolved',
      data: [120, 125, 130, 135, 138, 142, 145, 148, 152, 155, 158, 160, 163, 165, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186],
      borderColor: colors.flow,
      backgroundColor: colors.flowBg,
      tension: 0.4,
    },
  ],
}

// Adoption chart filters
export const adoptionFilters: FilterOption[] = [
  { id: 'human', label: 'Human Resolved', datasetIndex: 0, color: colors.human, checked: true },
  { id: 'ai-resolved', label: 'AI Fully Resolved', datasetIndex: 1, color: colors.aiResolved, checked: true },
  { id: 'ai-handover', label: 'AI Handover', datasetIndex: 2, color: colors.aiHandover, checked: true },
  { id: 'flow', label: 'Flow Resolved', datasetIndex: 3, color: colors.flow, checked: true },
]

// CSAT chart data
export const csatData: ChartData = {
  labels: ['Q1 24', 'Q2 24', 'Q3 24', 'Q4 24', 'Q1 25', 'Q2 25', 'Q3 25', 'Q4 25'],
  datasets: [
    {
      label: 'Human',
      data: [4.9, 4.9, 4.9, 4.9, 4.9, 4.9, 4.9, 4.9],
      borderColor: colors.human,
      backgroundColor: colors.humanBg,
      tension: 0.4,
    },
    {
      label: 'AI Fully Automated',
      data: [4.5, 4.6, 4.7, 4.7, 4.8, 4.8, 4.8, 4.8],
      borderColor: colors.aiResolved,
      backgroundColor: colors.aiResolvedBg,
      tension: 0.4,
    },
    {
      label: 'AI Overall',
      data: [4.3, 4.3, 4.4, 4.4, 4.5, 4.5, 4.5, 4.5],
      borderColor: colors.aiOverall,
      backgroundColor: colors.aiOverallBg,
      tension: 0.4,
    },
    {
      label: 'Flow Handled',
      data: [4.7, 4.7, 4.7, 4.8, 4.8, 4.8, 4.8, 4.8],
      borderColor: colors.flow,
      backgroundColor: colors.flowBg,
      tension: 0.4,
    },
  ],
}

// CSAT chart filters
export const csatFilters: FilterOption[] = [
  { id: 'human', label: 'Human', datasetIndex: 0, color: colors.human, checked: true },
  { id: 'ai-automated', label: 'AI Fully Automated', datasetIndex: 1, color: colors.aiResolved, checked: true },
  { id: 'ai-overall', label: 'AI Overall', datasetIndex: 2, color: colors.aiOverall, checked: true },
  { id: 'flow', label: 'Flow Handled', datasetIndex: 3, color: colors.flow, checked: true },
]

// Handover chart data
export const handoverData: ChartData = {
  labels: [
    'Jan 24', 'Feb 24', 'Mar 24', 'Apr 24', 'May 24', 'Jun 24',
    'Jul 24', 'Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24',
    'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25',
    'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25'
  ],
  datasets: [
    {
      label: 'Handover Required',
      data: [25, 26, 27, 26, 25, 25, 24, 24, 23, 23, 22, 22, 22, 22, 21, 21, 22, 22, 22, 23, 23, 23, 24, 24],
      borderColor: colors.aiHandover,
      backgroundColor: colors.aiHandoverBgFill,
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Fully Automated',
      data: [75, 74, 73, 74, 75, 75, 76, 76, 77, 77, 78, 78, 78, 78, 79, 79, 78, 78, 78, 77, 77, 77, 76, 76],
      borderColor: colors.aiResolved,
      backgroundColor: colors.aiResolvedBgFill,
      tension: 0.4,
      fill: true,
    },
  ],
}

// Handover chart filters
export const handoverFilters: FilterOption[] = [
  { id: 'handover', label: 'Handover Required', datasetIndex: 0, color: colors.aiHandover, checked: true },
  { id: 'automated', label: 'Fully Automated', datasetIndex: 1, color: colors.aiResolved, checked: true },
]

// Revenue chart data
export const revenueData: ChartData = {
  labels: ['Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25', 'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25'],
  datasets: [
    {
      label: 'Revenue Influenced ($M)',
      data: [2.1, 2.5, 2.8, 3.2, 3.5, 3.9, 4.2, 4.6, 4.9, 5.2, 5.5, 5.8],
      borderColor: colors.aiResolved,
      backgroundColor: colors.aiResolvedBgFill,
      tension: 0.4,
      yAxisID: 'y',
      fill: true,
    },
    {
      label: 'Total GMV ($M)',
      data: [110, 115, 118, 122, 125, 128, 130, 132, 135, 138, 140, 142],
      borderColor: colors.gmv,
      backgroundColor: colors.gmvBg,
      tension: 0.4,
      yAxisID: 'y1',
    },
  ],
}

// Revenue chart filters
export const revenueFilters: FilterOption[] = [
  { id: 'revenue', label: 'Revenue Influenced', datasetIndex: 0, color: colors.aiResolved, checked: true },
  { id: 'gmv', label: 'Total GMV', datasetIndex: 1, color: colors.gmv, checked: true },
]

// Section content data
export const sectionContent = {
  adoption: {
    title: '1. The Shift to Automation',
    insight: {
      title: 'Why this matters',
      content: "Automation isn't replacing humans—it's changing what they do. As AI handles routine queries, human agents focus on complex, high-value interactions. This chart shows the transition happening in real time across thousands of brands.",
    },
    keyFinding: 'AI-fully-resolved tickets grew from 45K in Jan 2024 to 185K by Dec 2025, while human-resolved volume stayed relatively flat. Brands are scaling support without scaling headcount.',
    methodology: 'Data pulled from interaction_metrics table covering Jan 2024 - Dec 2025. Resolution types classified by final handler: human agent, AI autonomous resolution, AI with human handover, or automated flow completion.',
  },
  csat: {
    title: '2. The Satisfaction Gap',
    insight: {
      title: 'Why this matters',
      content: "Customer satisfaction scores reveal where AI matches human performance and where it falls short. The gap isn't about technology—it's about choosing the right moments to automate.",
    },
    keyFinding: 'Fully automated AI tickets maintain 4.8/5 CSAT, nearly matching human performance at 4.9/5. But AI tickets requiring handover drop to 4.2/5, suggesting friction in the transition.',
    methodology: 'CSAT scores collected post-interaction across all resolution types. Scores range 1-5. Only tickets with recorded CSAT included in analysis.',
  },
  handover: {
    title: '3. The Handover Plateau',
    insight: {
      title: 'Why this matters',
      content: 'The percentage of AI tickets that need human intervention tells us about model confidence and scope. A plateau or rise in handovers suggests we\'re hitting the limits of current automation capabilities.',
    },
    keyFinding: 'After declining through early 2025, the handover rate stabilized at ~22% and slightly increased in Q4. This signals that simply throwing more AI at the problem won\'t improve outcomes—better targeting will.',
    methodology: 'Ratio calculated from AI-initiated tickets that required human intervention vs those resolved autonomously. Tracked monthly from Jan 2024 - Dec 2025.',
  },
  revenue: {
    title: '4. The Revenue Connection',
    insight: {
      title: 'Why this matters',
      content: "Better CX drives revenue. Our shopping assistant doesn't just answer questions—it influences purchase decisions. This chart connects support quality to actual dollars, making the business case for AI investment crystal clear.",
    },
    keyFinding: 'The shopping assistant influenced $47M in GMV during 2025, representing 3.2% of total merchant GMV. Brands using AI shopping support see measurably higher conversion rates.',
    methodology: 'Revenue influenced tracked when shopping assistant interaction occurred within 24 hours before purchase. Total GMV represents aggregate merchant volume for comparison baseline.',
  },
}
