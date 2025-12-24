// Primary gradient colors
export const colors = {
  // Primary gradient
  primary: '#667eea',
  primaryDark: '#764ba2',

  // Chart colors
  human: '#3498db',
  humanBg: 'rgba(52, 152, 219, 0.1)',

  aiResolved: '#2ecc71',
  aiResolvedBg: 'rgba(46, 204, 113, 0.1)',
  aiResolvedBgFill: 'rgba(46, 204, 113, 0.2)',

  aiHandover: '#e74c3c',
  aiHandoverBg: 'rgba(231, 76, 60, 0.1)',
  aiHandoverBgFill: 'rgba(231, 76, 60, 0.2)',

  flow: '#f39c12',
  flowBg: 'rgba(243, 156, 18, 0.1)',

  aiOverall: '#9b59b6',
  aiOverallBg: 'rgba(155, 89, 182, 0.1)',

  gmv: '#95a5a6',
  gmvBg: 'rgba(149, 165, 166, 0.1)',

  // UI colors
  text: '#2c3e50',
  textLight: '#555',
  background: '#f8f9fa',
  cardBg: '#ffffff',

  // Accent colors
  warning: '#ffc107',
  warningBg: '#fff3cd',
  info: '#0066cc',
  infoBg: '#e7f3ff',

  // Grid/border colors
  gridLine: 'rgba(0, 0, 0, 0.05)',
  border: 'rgba(0, 0, 0, 0.1)',
} as const

// Gradient strings
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  header: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  statCard: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
} as const

// Chart color palette in order for datasets
export const chartColorPalette = [
  { border: colors.human, bg: colors.humanBg },
  { border: colors.aiResolved, bg: colors.aiResolvedBg },
  { border: colors.aiHandover, bg: colors.aiHandoverBg },
  { border: colors.flow, bg: colors.flowBg },
  { border: colors.aiOverall, bg: colors.aiOverallBg },
  { border: colors.gmv, bg: colors.gmvBg },
] as const
