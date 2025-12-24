import { useMemo, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import { motion, useInView } from 'framer-motion'
import { chartContainerVariants, viewportSettings } from '@/constants/animations'
import { useResponsiveChartHeight, useIsMobile } from '@/hooks'
import { handoverCostData, formatCurrency } from '@/data/bigQueryData'
import type { ChartOptions } from 'chart.js'
import './ChartSetup'
import styles from './BaseChart.module.css'

export function HandoverAnalysisChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(chartRef, { once: true, amount: 0.3 })
  const responsiveHeight = useResponsiveChartHeight()
  const isMobile = useIsMobile()

  const chartData = useMemo(() => ({
    labels: handoverCostData.map(d => {
      const [year, month] = d.month.split('-')
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { month: 'short' })
    }),
    datasets: [
      {
        label: 'Handover Rate %',
        data: handoverCostData.map(d => d.handoverRate),
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        tension: 0.4,
        yAxisID: 'y',
        fill: true,
      },
      {
        label: 'Cost Premium ($)',
        data: handoverCostData.map(d => d.handoverCostPremium),
        borderColor: '#f39c12',
        backgroundColor: 'rgba(243, 156, 18, 0.1)',
        tension: 0.4,
        yAxisID: 'y1',
        borderDash: [5, 5],
      },
    ],
  }), [])

  const options: ChartOptions<'line'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    animation: isInView ? { duration: 1000, easing: 'easeOutQuart' } : false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'top',
        labels: {
          padding: isMobile ? 8 : 20,
          boxWidth: isMobile ? 10 : 15,
          font: { size: isMobile ? 10 : 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            if (ctx.datasetIndex === 0) {
              return `Handover Rate: ${ctx.raw}%`
            }
            return `Cost Premium: ${formatCurrency(ctx.raw as number, true)}`
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: !isMobile,
          text: 'Handover Rate (%)',
        },
        min: 40,
        max: 80,
        ticks: {
          callback: (value) => `${value}%`,
          font: { size: isMobile ? 9 : 11 },
        },
        grid: { color: 'rgba(0,0,0,0.05)' },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: !isMobile,
          text: 'Cost Premium ($)',
        },
        ticks: {
          callback: (value) => formatCurrency(value as number, true),
          font: { size: isMobile ? 9 : 11 },
        },
        grid: { drawOnChartArea: false },
      },
      x: {
        ticks: {
          font: { size: isMobile ? 9 : 11 },
          maxRotation: isMobile ? 45 : 0,
        },
        grid: { display: false },
      },
    },
  }), [isInView, isMobile])

  // Calculate total potential savings if handovers reduced by 50%
  const totalPotentialSavings = handoverCostData.reduce((sum, d) => sum + d.potentialSavings, 0)
  const currentHandoverRate = handoverCostData[handoverCostData.length - 1]?.handoverRate || 0

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
        <div>
          <span style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', color: '#666' }}>
            Current Rate: <strong style={{ color: '#e74c3c' }}>{currentHandoverRate}%</strong>
          </span>
        </div>
        <div style={{
          fontSize: isMobile ? '0.7rem' : '0.8rem',
          color: '#666',
          background: 'rgba(46, 204, 113, 0.1)',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px'
        }}>
          50% reduction = <strong style={{ color: '#2ecc71' }}>{formatCurrency(totalPotentialSavings, true)}</strong> saved/year
        </div>
      </div>
      {isInView && <Line data={chartData} options={options} />}
    </motion.div>
  )
}
