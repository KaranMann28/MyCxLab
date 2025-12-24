import { useRef, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { motion, useInView } from 'framer-motion'
import { chartContainerVariants, viewportSettings } from '@/constants/animations'
import { useResponsiveChartHeight, useIsMobile } from '@/hooks'
import type { ChartOptions, ChartData } from 'chart.js'
import type { FilterOption } from '@/types'
import './ChartSetup'
import styles from './BaseChart.module.css'

interface BaseChartProps {
  data: ChartData<'line'>
  options: ChartOptions<'line'>
  filters: FilterOption[]
  height?: number
}

export function BaseChart({ data, options, filters, height }: BaseChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(chartRef, { once: true, amount: 0.3 })
  const responsiveHeight = useResponsiveChartHeight()
  const isMobile = useIsMobile()

  const chartHeight = height ?? responsiveHeight

  // Filter datasets based on active filters
  const filteredData = useMemo(() => {
    const activeDatasetIndices = filters
      .filter((f) => f.checked)
      .map((f) => f.datasetIndex)

    return {
      ...data,
      datasets: data.datasets.filter((_, index) =>
        activeDatasetIndices.includes(index)
      ),
    }
  }, [data, filters])

  // Enhanced options with animation and mobile adjustments
  const enhancedOptions = useMemo<ChartOptions<'line'>>(() => ({
    ...options,
    animation: isInView
      ? {
          duration: 1000,
          easing: 'easeOutQuart',
        }
      : false,
    elements: {
      point: {
        radius: isMobile ? 2 : 3,
        hoverRadius: isMobile ? 4 : 6,
        hitRadius: isMobile ? 12 : 10,
      },
      line: {
        borderWidth: isMobile ? 1.5 : 2,
      },
    },
    plugins: {
      ...options.plugins,
      legend: {
        ...options.plugins?.legend,
        position: isMobile ? 'bottom' : 'top',
        labels: {
          ...(options.plugins?.legend as Record<string, unknown>)?.labels as Record<string, unknown>,
          padding: isMobile ? 8 : 20,
          boxWidth: isMobile ? 10 : 15,
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      tooltip: {
        ...options.plugins?.tooltip,
        titleFont: {
          size: isMobile ? 11 : 14,
        },
        bodyFont: {
          size: isMobile ? 10 : 13,
        },
        padding: isMobile ? 8 : 12,
      },
    },
    scales: {
      ...options.scales,
      y: {
        ...options.scales?.y,
        ticks: {
          ...(options.scales?.y as Record<string, unknown>)?.ticks as Record<string, unknown>,
          font: {
            size: isMobile ? 9 : 11,
          },
        },
      },
      x: {
        ...options.scales?.x,
        ticks: {
          ...(options.scales?.x as Record<string, unknown>)?.ticks as Record<string, unknown>,
          font: {
            size: isMobile ? 9 : 11,
          },
          maxRotation: isMobile ? 45 : 0,
        },
      },
    },
  }), [options, isInView, isMobile])

  return (
    <motion.div
      ref={chartRef}
      className={styles.chartContainer}
      style={{ height: chartHeight }}
      variants={chartContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewportSettings}
    >
      {isInView && (
        <Line data={filteredData} options={enhancedOptions} />
      )}
    </motion.div>
  )
}
