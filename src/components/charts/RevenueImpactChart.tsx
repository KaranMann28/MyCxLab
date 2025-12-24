import { useMemo, useRef } from 'react'
import { Chart } from 'react-chartjs-2'
import { motion, useInView } from 'framer-motion'
import { chartContainerVariants, viewportSettings } from '@/constants/animations'
import { useResponsiveChartHeight, useIsMobile } from '@/hooks'
import { revenueImpactData, formatCurrency } from '@/data/bigQueryData'
import type { ChartOptions, ChartData } from 'chart.js'
import './ChartSetup'
import styles from './BaseChart.module.css'

export function RevenueImpactChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(chartRef, { once: true, amount: 0.3 })
  const responsiveHeight = useResponsiveChartHeight()
  const isMobile = useIsMobile()

  const chartData: ChartData = useMemo(() => ({
    labels: revenueImpactData.map(d => {
      const [year, month] = d.month.split('-')
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { month: 'short' })
    }),
    datasets: [
      {
        type: 'bar' as const,
        label: 'GMV Influenced',
        data: revenueImpactData.map(d => d.gmvInfluenced),
        backgroundColor: 'rgba(46, 204, 113, 0.7)',
        borderColor: '#2ecc71',
        borderWidth: 1,
        yAxisID: 'y',
        order: 2,
      },
      {
        type: 'line' as const,
        label: 'Influence Rate %',
        data: revenueImpactData.map(d => d.influenceRate),
        borderColor: '#3498db',
        backgroundColor: 'transparent',
        borderWidth: 2,
        tension: 0.4,
        yAxisID: 'y1',
        pointRadius: isMobile ? 2 : 4,
        order: 1,
      },
    ],
  }), [isMobile])

  const options: ChartOptions = useMemo(() => ({
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
              return `GMV Influenced: ${formatCurrency(ctx.raw as number, true)}`
            }
            return `Influence Rate: ${(ctx.raw as number).toFixed(2)}%`
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
          text: 'GMV Influenced ($)',
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
          text: 'Influence Rate (%)',
        },
        min: 0,
        max: 3,
        ticks: {
          callback: (value) => `${value}%`,
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

  // Get total cumulative and peak month
  const totalInfluenced = revenueImpactData[revenueImpactData.length - 1]?.cumulativeInfluenced || 0
  const peakMonth = revenueImpactData.reduce((max, d) =>
    d.gmvInfluenced > max.gmvInfluenced ? d : max, revenueImpactData[0]
  )

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
          <span style={{ fontSize: isMobile ? '0.75rem' : '0.85rem', color: '#666' }}>
            2025 YTD GMV Influenced
          </span>
          <div style={{
            fontSize: isMobile ? '1.2rem' : '1.5rem',
            fontWeight: 'bold',
            color: '#2ecc71'
          }}>
            {formatCurrency(totalInfluenced, true)}
          </div>
        </div>
        <div style={{
          textAlign: 'right',
          fontSize: isMobile ? '0.7rem' : '0.8rem',
          color: '#666'
        }}>
          Peak: {peakMonth.month.split('-')[1] === '11' ? 'Nov' : 'Oct'} 2025
          <div style={{ color: '#3498db', fontWeight: '500' }}>
            {formatCurrency(peakMonth.gmvInfluenced, true)}
          </div>
        </div>
      </div>
      {isInView && <Chart type="bar" data={chartData} options={options} />}
    </motion.div>
  )
}
