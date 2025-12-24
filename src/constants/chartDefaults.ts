import type { ChartOptions } from 'chart.js'
import { colors } from './colors'

// Base chart options shared across all charts
export const baseChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 14,
        weight: 'bold',
      },
      bodyFont: {
        size: 13,
      },
      cornerRadius: 8,
      displayColors: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: colors.gridLine,
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
  animation: {
    duration: 1000,
    easing: 'easeOutQuart',
  },
}

// Chart animation config
export const chartAnimationConfig = {
  tension: 0.4,
  pointRadius: 3,
  pointHoverRadius: 6,
  borderWidth: 2,
  hoverBorderWidth: 3,
}

// Adoption chart specific options
export const adoptionChartOptions: ChartOptions<'line'> = {
  ...baseChartOptions,
  scales: {
    ...baseChartOptions.scales,
    y: {
      ...baseChartOptions.scales?.y,
      title: {
        display: true,
        text: 'Tickets (thousands)',
        font: {
          size: 12,
          weight: 'bold',
        },
      },
    },
  },
}

// CSAT chart specific options (zoomed y-axis)
export const csatChartOptions: ChartOptions<'line'> = {
  ...baseChartOptions,
  scales: {
    ...baseChartOptions.scales,
    y: {
      ...baseChartOptions.scales?.y,
      min: 3.5,
      max: 5,
      title: {
        display: true,
        text: 'CSAT Score (1-5)',
        font: {
          size: 12,
          weight: 'bold',
        },
      },
    },
  },
}

// Handover chart specific options
export const handoverChartOptions: ChartOptions<'line'> = {
  ...baseChartOptions,
  scales: {
    ...baseChartOptions.scales,
    y: {
      ...baseChartOptions.scales?.y,
      max: 100,
      title: {
        display: true,
        text: 'Percentage (%)',
        font: {
          size: 12,
          weight: 'bold',
        },
      },
    },
  },
}

// Revenue chart specific options (dual y-axis)
export const revenueChartOptions: ChartOptions<'line'> = {
  ...baseChartOptions,
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      title: {
        display: true,
        text: 'Revenue Influenced ($M)',
        font: {
          size: 12,
          weight: 'bold',
        },
      },
      grid: {
        color: 'rgba(46, 204, 113, 0.1)',
      },
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      title: {
        display: true,
        text: 'Total GMV ($M)',
        font: {
          size: 12,
          weight: 'bold',
        },
      },
      grid: {
        drawOnChartArea: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
}
