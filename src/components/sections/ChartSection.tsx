import { motion } from 'framer-motion'
import { Card, InsightBox, KeyFinding, MethodologyBox, FilterControls } from '@/components/ui'
import { fadeInUpVariants, viewportSettings } from '@/constants/animations'
import type { FilterOption, InsightData } from '@/types'
import styles from './ChartSection.module.css'

interface ChartSectionProps {
  title: string
  insight: InsightData
  keyFinding: string
  methodology: string
  chartId: 'adoption' | 'csat' | 'handover' | 'revenue'
  filters: FilterOption[]
  children: React.ReactNode // The chart component
}

export function ChartSection({
  title,
  insight,
  keyFinding,
  methodology,
  chartId,
  filters,
  children,
}: ChartSectionProps) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewportSettings}
    >
      <Card className={styles.chartSection}>
        <motion.h3
          className={styles.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportSettings}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h3>

        <InsightBox title={insight.title} content={insight.content} />

        <FilterControls chartId={chartId} filters={filters} />

        <div className={styles.chartContainer}>
          {children}
        </div>

        <KeyFinding content={keyFinding} />

        <MethodologyBox content={methodology} />
      </Card>
    </motion.div>
  )
}
