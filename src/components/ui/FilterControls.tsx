import { motion } from 'framer-motion'
import { useDashboardStore } from '@/store/dashboardStore'
import type { FilterOption } from '@/types'
import styles from './FilterControls.module.css'

interface FilterControlsProps {
  chartId: 'adoption' | 'csat' | 'handover' | 'revenue'
  filters: FilterOption[]
}

export function FilterControls({ chartId, filters }: FilterControlsProps) {
  const toggleFilter = useDashboardStore((state) => state.toggleFilter)

  return (
    <motion.div
      className={styles.filterControls}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {filters.map((filter, index) => (
        <motion.label
          key={filter.id}
          className={styles.filterLabel}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <input
            type="checkbox"
            checked={filter.checked}
            onChange={() => toggleFilter(chartId, filter.id)}
            className={styles.checkbox}
          />
          <span
            className={styles.colorDot}
            style={{ backgroundColor: filter.color }}
          />
          <span className={styles.labelText}>{filter.label}</span>
        </motion.label>
      ))}
    </motion.div>
  )
}
