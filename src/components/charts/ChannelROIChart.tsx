import { useMemo, useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import { motion, useInView } from 'framer-motion'
import { chartContainerVariants, viewportSettings } from '@/constants/animations'
import { useResponsiveChartHeight, useIsMobile } from '@/hooks'
import { channelROIData, formatCurrency } from '@/data/bigQueryData'
import type { ChartOptions } from 'chart.js'
import './ChartSetup'
import styles from './BaseChart.module.css'

export function ChannelROIChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(chartRef, { once: true, amount: 0.3 })
  const responsiveHeight = useResponsiveChartHeight()
  const isMobile = useIsMobile()

  // Sort by efficiency (volume share - cost share)
  const sortedData = useMemo(() =>
    [...channelROIData].sort((a, b) =>
      (b.volumeSharePct - b.costSharePct) - (a.volumeSharePct - a.costSharePct)
    ),
    []
  )

  const chartData = useMemo(() => ({
    labels: sortedData.map(d => d.channel),
    datasets: [
      {
        label: 'Volume Share %',
        data: sortedData.map(d => d.volumeSharePct),
        backgroundColor: 'rgba(52, 152, 219, 0.7)',
        borderColor: '#3498db',
        borderWidth: 1,
      },
      {
        label: 'Cost Share %',
        data: sortedData.map(d => d.costSharePct),
        backgroundColor: 'rgba(231, 76, 60, 0.7)',
        borderColor: '#e74c3c',
        borderWidth: 1,
      },
    ],
  }), [sortedData])

  const options: ChartOptions<'bar'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    animation: isInView ? { duration: 1000, easing: 'easeOutQuart' } : false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: isMobile ? 8 : 20,
          boxWidth: isMobile ? 10 : 15,
          font: { size: isMobile ? 10 : 12 },
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: (ctx) => {
            const item = sortedData[ctx.dataIndex]
            const efficiency = item.volumeSharePct - item.costSharePct
            return efficiency > 0
              ? `Efficiency: +${efficiency.toFixed(1)}% (cost-effective)`
              : `Efficiency: ${efficiency.toFixed(1)}% (over-costed)`
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: !isMobile,
          text: 'Share (%)',
        },
        ticks: {
          callback: (value) => `${value}%`,
          font: { size: isMobile ? 9 : 11 },
        },
        grid: { color: 'rgba(0,0,0,0.05)' },
      },
      y: {
        ticks: {
          font: { size: isMobile ? 9 : 11 },
        },
        grid: { display: false },
      },
    },
  }), [isInView, isMobile, sortedData])

  // Find most efficient and least efficient channels
  const mostEfficient = sortedData[0]
  const leastEfficient = sortedData[sortedData.length - 1]
  const totalMonthlyCost = channelROIData.reduce((sum, d) => sum + d.estimatedMonthlyCost, 0)

  return (
    <motion.div
      ref={chartRef}
      className={styles.chartContainer}
      style={{ height: responsiveHeight + 50 }}
      variants={chartContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewportSettings}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
        padding: '0 0.5rem',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div>
          <span style={{ fontSize: isMobile ? '0.75rem' : '0.85rem', color: '#666' }}>
            Monthly Support Cost
          </span>
          <div style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            fontWeight: 'bold',
            color: '#e74c3c'
          }}>
            {formatCurrency(totalMonthlyCost, true)}
          </div>
        </div>
        <div style={{
          display: 'flex',
          gap: '1rem',
          fontSize: isMobile ? '0.65rem' : '0.75rem'
        }}>
          <div style={{
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            color: '#2ecc71'
          }}>
            Most Efficient: <strong>{mostEfficient.channel}</strong>
          </div>
          <div style={{
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            color: '#e74c3c'
          }}>
            Least Efficient: <strong>{leastEfficient.channel}</strong>
          </div>
        </div>
      </div>
      {isInView && <Bar data={chartData} options={options} />}
    </motion.div>
  )
}
