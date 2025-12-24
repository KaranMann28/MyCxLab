/**
 * Format a number with commas as thousands separators
 */
export function formatNumber(num: number): string {
  return num.toLocaleString()
}

/**
 * Format a number as currency (USD)
 */
export function formatCurrency(num: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

/**
 * Format a number as percentage
 */
export function formatPercentage(num: number, decimals = 1): string {
  return `${num.toFixed(decimals)}%`
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string, format: 'short' | 'long' = 'short'): string {
  const date = new Date(dateString)

  if (format === 'short') {
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
  }

  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

/**
 * Format quarter string (e.g., "2024-01-01" -> "Q1 24")
 */
export function formatQuarter(dateString: string): string {
  const date = new Date(dateString)
  const quarter = Math.floor(date.getMonth() / 3) + 1
  const year = date.getFullYear().toString().slice(2)
  return `Q${quarter} ${year}`
}
