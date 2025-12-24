import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { csatWarningData, formatNumber, type TrendStatus } from '@/data/bigQueryData'
import styles from './CSATWarningTable.module.css'

const getTrendIcon = (status: TrendStatus): string => {
  switch (status) {
    case 'DECLINING - Action Needed': return '  '
    case 'Watch Closely': return '  '
    case 'Improving': return '  '
    default: return '  '
  }
}

const getStatusColor = (status: TrendStatus): string => {
  switch (status) {
    case 'DECLINING - Action Needed': return '#e74c3c'
    case 'Watch Closely': return '#f39c12'
    case 'Improving': return '#2ecc71'
    default: return '#95a5a6'
  }
}

const getStatusBg = (status: TrendStatus): string => {
  switch (status) {
    case 'DECLINING - Action Needed': return 'rgba(231, 76, 60, 0.1)'
    case 'Watch Closely': return 'rgba(243, 156, 18, 0.1)'
    case 'Improving': return 'rgba(46, 204, 113, 0.1)'
    default: return 'rgba(149, 165, 166, 0.1)'
  }
}

export function CSATWarningTable() {
  // Sort by urgency (declining first, then watch, then stable)
  const sortedData = useMemo(() =>
    [...csatWarningData].sort((a, b) => {
      const priority: Record<TrendStatus, number> = {
        'DECLINING - Action Needed': 0,
        'Watch Closely': 1,
        'Stable': 2,
        'Improving': 3,
      }
      return priority[a.trendStatus] - priority[b.trendStatus]
    }),
    []
  )

  const alertCount = csatWarningData.filter(d =>
    d.trendStatus === 'DECLINING - Action Needed' || d.trendStatus === 'Watch Closely'
  ).length

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <span className={styles.title}>CSAT Early Warning System</span>
        <span className={styles.alertBadge}>
          {alertCount} Alert{alertCount !== 1 ? 's' : ''}
        </span>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Intent</th>
              <th>Current</th>
              <th>Change</th>
              <th>Volume</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <motion.tr
                key={item.contactReason}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td className={styles.intentCell}>{item.contactReason}</td>
                <td className={styles.csatCell}>
                  <span style={{
                    color: item.currentCSAT < 3.5 ? '#e74c3c' : item.currentCSAT < 4.0 ? '#f39c12' : '#2ecc71'
                  }}>
                    {item.currentCSAT.toFixed(2)}
                  </span>
                </td>
                <td className={styles.changeCell}>
                  <span style={{ color: item.csatChange < 0 ? '#e74c3c' : '#2ecc71' }}>
                    {item.csatChange > 0 ? '+' : ''}{item.csatChange.toFixed(2)}
                  </span>
                </td>
                <td className={styles.volumeCell}>{formatNumber(item.volume, true)}</td>
                <td>
                  <span
                    className={styles.statusBadge}
                    style={{
                      color: getStatusColor(item.trendStatus),
                      backgroundColor: getStatusBg(item.trendStatus),
                    }}
                  >
                    {getTrendIcon(item.trendStatus)} {item.trendStatus.split(' - ')[0]}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
