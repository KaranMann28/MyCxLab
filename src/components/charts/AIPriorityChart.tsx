import { useMemo, useRef } from 'react'
import { Bubble } from 'react-chartjs-2'
import { motion, useInView } from 'framer-motion'
import { chartContainerVariants, viewportSettings } from '@/constants/animations'
import { useResponsiveChartHeight, useIsMobile } from '@/hooks'
import { aiPriorityData, type PriorityTier } from '@/data/bigQueryData'
import type { ChartOptions } from 'chart.js'
import './ChartSetup'
import styles from './BaseChart.module.css'

const getPriorityColor = (tier: PriorityTier): string => {
  switch (tier) {
    case 'P1 - Immediate Focus': return 'rgba(231, 76, 60, 0.7)'
    case 'P2 - High Priority': return 'rgba(243, 156, 18, 0.7)'
    case 'P3 - Monitor': return 'rgba(52, 152, 219, 0.7)'
    case 'P4 - Optimized': return 'rgba(46, 204, 113, 0.7)'
  }
}

const getPriorityBorder = (tier: PriorityTier): string => {
  switch (tier) {
    case 'P1 - Immediate Focus': return '#e74c3c'
    case 'P2 - High Priority': return '#f39c12'
    case 'P3 - Monitor': return '#3498db'
    case 'P4 - Optimized': return '#2ecc71'
  }
}

export function AIPriorityChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(chartRef, { once: true, amount: 0.3 })
  const responsiveHeight = useResponsiveChartHeight()
  const isMobile = useIsMobile()

  const chartData = useMemo(() => ({
    datasets: aiPriorityData.map(item => ({
      label: item.contactReason,
      data: [{
        x: item.totalVolume,
        y: item.currentCSAT,
        r: Math.max(8, item.priorityScore / 5), // Scale bubble size
      }],
      backgroundColor: getPriorityColor(item.priorityTier),
      borderColor: getPriorityBorder(item.priorityTier),
      borderWidth: 2,
    })),
  }), [])

  const options: ChartOptions<'bubble'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: isInView ? { duration: 1000, easing: 'easeOutQuart' } : false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const item = aiPriorityData[ctx.datasetIndex]
            return [
              `Intent: ${item.contactReason}`,
              `Volume: ${item.totalVolume.toLocaleString()}`,
              `CSAT: ${item.currentCSAT.toFixed(2)}`,
              `Priority: ${item.priorityTier}`,
            ]
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Ticket Volume (30 days)',
          font: { size: isMobile ? 10 : 12 },
        },
        ticks: {
          callback: (value) => {
            const num = value as number
            return num >= 1000 ? `${(num / 1000).toFixed(0)}K` : num
          },
          font: { size: isMobile ? 9 : 11 },
        },
        grid: { color: 'rgba(0,0,0,0.05)' },
      },
      y: {
        title: {
          display: true,
          text: 'CSAT Score',
          font: { size: isMobile ? 10 : 12 },
        },
        min: 2.5,
        max: 4.5,
        ticks: {
          font: { size: isMobile ? 9 : 11 },
        },
        grid: { color: 'rgba(0,0,0,0.05)' },
      },
    },
  }), [isInView, isMobile])

  const p1Count = aiPriorityData.filter(d => d.priorityTier === 'P1 - Immediate Focus').length
  const p2Count = aiPriorityData.filter(d => d.priorityTier === 'P2 - High Priority').length

  return (
    <motion.div
      ref={chartRef}
      className={styles.chartContainer}
      style={{ height: responsiveHeight }}
      variants={chartContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewportSettings}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        padding: '0 0.5rem',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            color: '#e74c3c'
          }}>
            P1: {p1Count} intents
          </span>
          <span style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: 'rgba(243, 156, 18, 0.1)',
            color: '#f39c12'
          }}>
            P2: {p2Count} intents
          </span>
        </div>
        <span style={{ fontSize: '0.7rem', color: '#666' }}>
          Bubble size = Priority score
        </span>
      </div>
      {isInView && <Bubble data={chartData} options={options} />}
    </motion.div>
  )
}
