import { StaggeredContainer } from '@/components/animations'
import { StatCard } from '@/components/ui'
import type { StatData } from '@/types'
import styles from './StatsGrid.module.css'

interface StatsGridProps {
  stats: StatData[]
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <StaggeredContainer className={styles.statsGrid} delay={0.15}>
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          number={stat.number}
          label={stat.label}
          delay={index * 0.15}
        />
      ))}
    </StaggeredContainer>
  )
}
