import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Header, Footer, Container } from '@/components/layout'
import {
  AutomationSavingsChart,
  CSATWarningTable,
  AIPriorityChart,
  HandoverAnalysisChart,
  RevenueImpactChart,
  ChannelROIChart,
} from '@/components/charts'
import { kpiSummary, formatCurrency } from '@/data/bigQueryData'
import styles from './InsightsDashboard.module.css'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
    },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 18,
    },
  },
}

// KPI Card Component - redesigned with value after title
function KPICard({
  title,
  value,
  subtitle,
  color,
  trend,
}: {
  title: string
  value: string
  subtitle?: string
  color: string
  trend?: { direction: 'up' | 'down' | 'neutral'; label: string }
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={styles.kpiCard}
      variants={itemVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)' }}
    >
      <motion.div
        className={styles.kpiGlow}
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}25, transparent 70%)` }}
        animate={{ opacity: isHovered ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      />
      <div className={styles.kpiContent}>
        <span className={styles.kpiTitle}>{title}</span>
        <motion.div
          className={styles.kpiValue}
          style={{ color }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          {value}
        </motion.div>
        {subtitle && <span className={styles.kpiSubtitle}>{subtitle}</span>}
        {trend && (
          <motion.div
            className={`${styles.kpiTrend} ${styles[`trend${trend.direction.charAt(0).toUpperCase() + trend.direction.slice(1)}`]}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className={styles.trendArrow}>
              {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'}
            </span>
            {trend.label}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Section Header without numbers
function SectionHeader({
  title,
  subtitle,
  badge,
}: {
  title: string
  subtitle: string
  badge?: { text: string; color: string }
}) {
  return (
    <motion.div
      className={styles.sectionHeader}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
    >
      <div className={styles.sectionTitleGroup}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionSubtitle}>{subtitle}</p>
      </div>
      {badge && (
        <motion.span
          className={styles.badge}
          style={{ backgroundColor: `${badge.color}12`, color: badge.color, borderColor: `${badge.color}30` }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05, backgroundColor: `${badge.color}20` }}
        >
          {badge.text}
        </motion.span>
      )}
    </motion.div>
  )
}

// Methodology Panel Component
function MethodologyPanel({
  whyMatters,
  methodology,
  dataSource,
  isOpen,
  onToggle,
  labels,
}: {
  whyMatters: string
  methodology: string
  dataSource: string
  isOpen: boolean
  onToggle: () => void
  labels: {
    toggle: string
    whyMattersLabel: string
    methodologyLabel: string
    dataSourceLabel: string
  }
}) {
  return (
    <div className={styles.methodologyWrapper}>
      <motion.button
        className={styles.methodologyToggle}
        onClick={onToggle}
        whileHover={{ backgroundColor: 'rgba(102, 126, 234, 0.1)' }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          className={styles.methodologyIcon}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.span>
        <span>{labels.toggle}</span>
        <motion.span
          className={styles.methodologyChevron}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={styles.methodologyContent}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              className={styles.methodologyGrid}
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <div className={styles.methodologyItem}>
                <div className={styles.methodologyLabel}>{labels.whyMattersLabel}</div>
                <div className={styles.methodologyText}>{whyMatters}</div>
              </div>
              <div className={styles.methodologyItem}>
                <div className={styles.methodologyLabel}>{labels.methodologyLabel}</div>
                <div className={styles.methodologyText}>{methodology}</div>
              </div>
              <div className={styles.methodologyItem}>
                <div className={styles.methodologyLabel}>{labels.dataSourceLabel}</div>
                <div className={styles.methodologyText}>{dataSource}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Enhanced Chart Card with methodology and collapsible chart
function ChartCard({
  title,
  description,
  children,
  meta,
  labels,
}: {
  title: string
  description: string
  children: React.ReactNode
  meta: { whyMatters: string; methodology: string; dataSource: string }
  labels: {
    toggle: string
    whyMattersLabel: string
    methodologyLabel: string
    dataSourceLabel: string
  }
}) {
  const [methodologyOpen, setMethodologyOpen] = useState(false)
  const [chartExpanded, setChartExpanded] = useState(true)

  return (
    <motion.div
      className={styles.chartCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      layout
    >
      <motion.div
        className={styles.chartHeader}
        onClick={() => setChartExpanded(!chartExpanded)}
        style={{ cursor: 'pointer' }}
        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
        layout
      >
        <div className={styles.chartHeaderContent}>
          <motion.h3
            className={styles.chartTitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            layout
          >
            {title}
          </motion.h3>
          <motion.p
            className={styles.chartDescription}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            layout
          >
            {description}
          </motion.p>
        </div>
        <motion.button
          className={styles.chartCollapseBtn}
          animate={{ rotate: chartExpanded ? 0 : -90 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            e.stopPropagation()
            setChartExpanded(!chartExpanded)
          }}
        >
          <span className={styles.collapseIcon}>▼</span>
        </motion.button>
      </motion.div>

      <AnimatePresence initial={false}>
        {chartExpanded && (
          <motion.div
            className={styles.chartCollapsible}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              className={styles.chartContent}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {children}
            </motion.div>

            <MethodologyPanel
              whyMatters={meta.whyMatters}
              methodology={meta.methodology}
              dataSource={meta.dataSource}
              isOpen={methodologyOpen}
              onToggle={() => setMethodologyOpen(!methodologyOpen)}
              labels={labels}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function InsightsDashboard() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3])

  // Methodology labels for translation
  const methodologyLabels = {
    toggle: t('insights.methodology.toggle'),
    whyMattersLabel: t('insights.methodology.whyMatters'),
    methodologyLabel: t('insights.methodology.methodologyLabel'),
    dataSourceLabel: t('insights.methodology.dataSource'),
  }

  return (
    <>
      <Header />

      <Container>
        <div ref={containerRef} className={styles.dashboardContainer}>
          {/* Animated Background */}
          <motion.div
            className={styles.backgroundGradient}
            style={{ y: backgroundY, opacity: backgroundOpacity }}
          />

          {/* Hero Section */}
          <motion.div
            className={styles.hero}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className={styles.heroBadge}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              {t('insights.hero.badge')}
            </motion.div>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t('insights.hero.title')}
              <br />
              <span className={styles.heroHighlight}>{t('insights.hero.titleHighlight')}</span>
            </motion.h1>
            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              {t('insights.hero.subtitle')}
            </motion.p>
          </motion.div>

          {/* KPI Cards */}
          <motion.div
            className={styles.kpiGrid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <KPICard
              title={t('insights.kpi.ytdSavings.title')}
              value={formatCurrency(kpiSummary.ytdSavings, true)}
              subtitle={t('insights.kpi.ytdSavings.subtitle')}
              color="#10b981"
              trend={{ direction: 'up', label: t('insights.kpi.ytdSavings.trend') }}
            />
            <KPICard
              title={t('insights.kpi.gmvInfluenced.title')}
              value={formatCurrency(kpiSummary.ytdGMVInfluenced, true)}
              subtitle={t('insights.kpi.gmvInfluenced.subtitle')}
              color="#3b82f6"
              trend={{ direction: 'up', label: t('insights.kpi.gmvInfluenced.trend') }}
            />
            <KPICard
              title={t('insights.kpi.handoverRate.title')}
              value={`${kpiSummary.currentHandoverRate}%`}
              subtitle={t('insights.kpi.handoverRate.subtitle')}
              color="#ef4444"
              trend={{ direction: 'down', label: t('insights.kpi.handoverRate.trend') }}
            />
            <KPICard
              title={t('insights.kpi.csatAlerts.title')}
              value={String(kpiSummary.csatRiskCount)}
              subtitle={t('insights.kpi.csatAlerts.subtitle')}
              color="#f59e0b"
              trend={{ direction: 'neutral', label: t('insights.kpi.csatAlerts.trend') }}
            />
            <KPICard
              title={t('insights.kpi.p1Priority.title')}
              value={String(kpiSummary.p1IntentCount)}
              subtitle={t('insights.kpi.p1Priority.subtitle')}
              color="#ef4444"
              trend={{ direction: 'neutral', label: t('insights.kpi.p1Priority.trend') }}
            />
            <KPICard
              title={t('insights.kpi.resolutionRate.title')}
              value={`${kpiSummary.avgResolutionRate.toFixed(1)}%`}
              subtitle={t('insights.kpi.resolutionRate.subtitle')}
              color="#8b5cf6"
              trend={{ direction: 'up', label: t('insights.kpi.resolutionRate.trend') }}
            />
          </motion.div>

          {/* Section: Automation ROI */}
          <motion.section
            className={styles.section}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <SectionHeader
              title={t('insights.sections.automation.title')}
              subtitle={t('insights.sections.automation.subtitle')}
              badge={{ text: t('insights.sections.automation.badge'), color: '#10b981' }}
            />
            <ChartCard
              title={t('insights.sections.automation.chartTitle')}
              description={t('insights.sections.automation.chartDescription')}
              meta={{
                whyMatters: t('insights.methodology.automation.whyMatters'),
                methodology: t('insights.methodology.automation.methodology'),
                dataSource: t('insights.methodology.automation.dataSource'),
              }}
              labels={methodologyLabels}
            >
              <AutomationSavingsChart />
            </ChartCard>
          </motion.section>

          {/* Section: Handover Analysis */}
          <motion.section
            className={styles.section}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <SectionHeader
              title={t('insights.sections.handover.title')}
              subtitle={t('insights.sections.handover.subtitle')}
              badge={{ text: t('insights.sections.handover.badge'), color: '#ef4444' }}
            />
            <ChartCard
              title={t('insights.sections.handover.chartTitle')}
              description={t('insights.sections.handover.chartDescription')}
              meta={{
                whyMatters: t('insights.methodology.handover.whyMatters'),
                methodology: t('insights.methodology.handover.methodology'),
                dataSource: t('insights.methodology.handover.dataSource'),
              }}
              labels={methodologyLabels}
            >
              <HandoverAnalysisChart />
            </ChartCard>
          </motion.section>

          {/* Section: CSAT Early Warning */}
          <motion.section
            className={styles.section}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <SectionHeader
              title={t('insights.sections.csat.title')}
              subtitle={t('insights.sections.csat.subtitle')}
              badge={{ text: t('insights.sections.csat.badge'), color: '#f59e0b' }}
            />
            <ChartCard
              title={t('insights.sections.csat.chartTitle')}
              description={t('insights.sections.csat.chartDescription')}
              meta={{
                whyMatters: t('insights.methodology.csat.whyMatters'),
                methodology: t('insights.methodology.csat.methodology'),
                dataSource: t('insights.methodology.csat.dataSource'),
              }}
              labels={methodologyLabels}
            >
              <CSATWarningTable />
            </ChartCard>
          </motion.section>

          {/* Section: AI Priority Matrix */}
          <motion.section
            className={styles.section}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <SectionHeader
              title={t('insights.sections.priority.title')}
              subtitle={t('insights.sections.priority.subtitle')}
              badge={{ text: t('insights.sections.priority.badge'), color: '#3b82f6' }}
            />
            <ChartCard
              title={t('insights.sections.priority.chartTitle')}
              description={t('insights.sections.priority.chartDescription')}
              meta={{
                whyMatters: t('insights.methodology.priority.whyMatters'),
                methodology: t('insights.methodology.priority.methodology'),
                dataSource: t('insights.methodology.priority.dataSource'),
              }}
              labels={methodologyLabels}
            >
              <AIPriorityChart />
            </ChartCard>
          </motion.section>

          {/* Section: Revenue Impact */}
          <motion.section
            className={styles.section}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <SectionHeader
              title={t('insights.sections.revenue.title')}
              subtitle={t('insights.sections.revenue.subtitle')}
              badge={{ text: t('insights.sections.revenue.badge'), color: '#10b981' }}
            />
            <ChartCard
              title={t('insights.sections.revenue.chartTitle')}
              description={t('insights.sections.revenue.chartDescription')}
              meta={{
                whyMatters: t('insights.methodology.revenue.whyMatters'),
                methodology: t('insights.methodology.revenue.methodology'),
                dataSource: t('insights.methodology.revenue.dataSource'),
              }}
              labels={methodologyLabels}
            >
              <RevenueImpactChart />
            </ChartCard>
          </motion.section>

          {/* Section: Channel ROI */}
          <motion.section
            className={styles.section}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <SectionHeader
              title={t('insights.sections.channel.title')}
              subtitle={t('insights.sections.channel.subtitle')}
              badge={{ text: t('insights.sections.channel.badge'), color: '#8b5cf6' }}
            />
            <ChartCard
              title={t('insights.sections.channel.chartTitle')}
              description={t('insights.sections.channel.chartDescription')}
              meta={{
                whyMatters: t('insights.methodology.channel.whyMatters'),
                methodology: t('insights.methodology.channel.methodology'),
                dataSource: t('insights.methodology.channel.dataSource'),
              }}
              labels={methodologyLabels}
            >
              <ChannelROIChart />
            </ChartCard>
          </motion.section>

          {/* Footer Note */}
          <motion.div
            className={styles.dataNote}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.dataNoteLine} />
            <div className={styles.dataNoteContent}>
              <span className={styles.dataNoteLabel}>{t('insights.dataNote.label')}</span>
              <span className={styles.dataNoteText}>{t('insights.dataNote.text')}</span>
            </div>
          </motion.div>
        </div>
      </Container>

      <Footer />
    </>
  )
}
