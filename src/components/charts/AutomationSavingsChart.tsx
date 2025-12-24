import { useMemo, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import { motion, useInView } from 'framer-motion'
import { chartContainerVariants, viewportSettings } from '@/constants/animations'
import { useResponsiveChartHeight, useIsMobile } from '@/hooks'
import { automationSavingsData, formatCurrency } from '@/data/bigQueryData'
import type { ChartOptions } from 'chart.js'
import './ChartSetup'
import styles from './BaseChart.module.css'

export function AutomationSavingsChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(chartRef, { once: true, amount: 0.3 })
  const responsiveHeight = useResponsiveChartHeight()
  const isMobile = useIsMobile()

  // Filter to 2025 data only for cleaner view
  const data2025 = useMemo(() =>
    automationSavingsData.filter(d => d.month.startsWith('2025')),
    []
  )

  // Calculate cumulative savings
  const cumulativeSavings = useMemo(() => {
    let total = 0
    return data2025.map(d => {
      total += d.monthlySavings
      return total
    })
  }, [data2025])

  const chartData = useMemo(() => ({
    labels: data2025.map(d => {
      const [year, month] = d.month.split('-')
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { month: 'short' })
    }),
    datasets: [
      {
        label: 'Monthly Savings',
        data: data2025.map(d => d.monthlySavings),
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.3)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Cumulative Savings',
        data: cumulativeSavings,
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  }), [data2025, cumulativeSavings])

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
            const value = ctx.raw as number
            return `${ctx.dataset.label}: ${formatCurrency(value, true)}`
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
          text: 'Monthly Savings ($)',
        },
        ticks: {
          callback: (value) => formatCurrency(value as number, true),
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
          text: 'Cumulative Savings ($)',
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

  // Calculate total YTD savings for display
  const totalYTDSavings = cumulativeSavings[cumulativeSavings.length - 1] || 0

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
        padding: '0 0.5rem'
      }}>
        <span style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', color: '#666' }}>
          2025 YTD Automation Savings
        </span>
        <span style={{
          fontSize: isMobile ? '1.2rem' : '1.5rem',
          fontWeight: 'bold',
          color: '#2ecc71'
        }}>
          {formatCurrency(totalYTDSavings, true)}
        </span>
      </div>
      {isInView && <Line data={chartData} options={options} />}
    </motion.div>
  )
}
