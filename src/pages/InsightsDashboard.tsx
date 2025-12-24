import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
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

// Insight metadata with "Why it matters" and methodology
const insightMeta = {
  automation: {
    whyMatters: 'Understanding cost savings validates AI investment and identifies optimization opportunities.',
    methodology: 'Cost model: Human = $5/ticket, Automated = $0.50/ticket, Handover = $3.50/ticket. Based on industry benchmarks and internal cost analysis.',
    dataSource: 'BigQuery: MonthlyTicketHandlingEvolutionsince2024',
  },
  handover: {
    whyMatters: 'Every handover represents lost efficiency. Reducing handovers directly improves margins.',
    methodology: 'Handover cost premium calculated as $4.50 per ticket (difference between human and automated resolution costs).',
    dataSource: 'BigQuery: AIAgentTicketHandovervsFullyAutomatedTickets',
  },
  csat: {
    whyMatters: 'Early detection of CSAT decline enables proactive intervention before customer churn.',
    methodology: '14-day rolling comparison: current week vs previous week averages. Decline threshold: -0.2 points.',
    dataSource: 'BigQuery: AIAgentCSATbyTicketIntentRolling7Day',
  },
  priority: {
    whyMatters: 'Focus AI training on high-impact areas to maximize improvement ROI.',
    methodology: 'Priority Score = (Volume Percentile + CSAT Improvement Need) / 2. P1 threshold: score >= 75.',
    dataSource: 'BigQuery: AIAgentCSATbyTicketIntentRolling7Day, DistinctIntent',
  },
  revenue: {
    whyMatters: 'Quantifies AI contribution to business revenue, proving strategic value.',
    methodology: 'GMV attributed when AI interaction occurs within 24 hours before purchase.',
    dataSource: 'BigQuery: TotalRevenueInfluencedandTotalGMVin2025',
  },
  channel: {
    whyMatters: 'Channel efficiency analysis guides resource allocation and investment decisions.',
    methodology: 'Volume share vs cost share comparison. Efficient channels have higher volume share than cost share.',
    dataSource: 'BigQuery: SupportInquiriesbyIntentandChannel',
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
}: {
  whyMatters: string
  methodology: string
  dataSource: string
  isOpen: boolean
  onToggle: () => void
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
        <span>Why it matters & Methodology</span>
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
                <div className={styles.methodologyLabel}>Why it matters</div>
                <div className={styles.methodologyText}>{whyMatters}</div>
              </div>
              <div className={styles.methodologyItem}>
                <div className={styles.methodologyLabel}>Methodology</div>
                <div className={styles.methodologyText}>{methodology}</div>
              </div>
              <div className={styles.methodologyItem}>
                <div className={styles.methodologyLabel}>Data source</div>
                <div className={styles.methodologyText}>{dataSource}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Enhanced Chart Card with methodology
function ChartCard({
  title,
  description,
  children,
  meta,
}: {
  title: string
  description: string
  children: React.ReactNode
  meta: { whyMatters: string; methodology: string; dataSource: string }
}) {
  const [methodologyOpen, setMethodologyOpen] = useState(false)

  return (
    <motion.div
      className={styles.chartCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
    >
      <div className={styles.chartHeader}>
        <motion.h3
          className={styles.chartTitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className={styles.chartDescription}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          {description}
        </motion.p>
      </div>

      <motion.div
        className={styles.chartContent}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        {children}
      </motion.div>

      <MethodologyPanel
        whyMatters={meta.whyMatters}
        methodology={meta.methodology}
        dataSource={meta.dataSource}
        isOpen={methodologyOpen}
        onToggle={() => setMethodologyOpen(!methodologyOpen)}
      />
    </motion.div>
  )
}

export function InsightsDashboard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3])

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
              CX Lab Intelligence
            </motion.div>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Actionable Insights Beyond
              <br />
              <span className={styles.heroHighlight}>Standard Reporting</span>
            </motion.h1>
            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Real-time BigQuery analytics powering data-driven CX decisions
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
              title="YTD Automation Savings"
              value={formatCurrency(kpiSummary.ytdSavings, true)}
              subtitle="Cost avoided through AI"
              color="#10b981"
              trend={{ direction: 'up', label: 'vs manual' }}
            />
            <KPICard
              title="GMV Influenced"
              value={formatCurrency(kpiSummary.ytdGMVInfluenced, true)}
              subtitle="Revenue impact YTD"
              color="#3b82f6"
              trend={{ direction: 'up', label: '2025 YTD' }}
            />
            <KPICard
              title="Handover Rate"
              value={`${kpiSummary.currentHandoverRate}%`}
              subtitle="Room for optimization"
              color="#ef4444"
              trend={{ direction: 'down', label: 'target: <20%' }}
            />
            <KPICard
              title="CSAT Alerts"
              value={String(kpiSummary.csatRiskCount)}
              subtitle="Intents need attention"
              color="#f59e0b"
              trend={{ direction: 'neutral', label: 'monitoring' }}
            />
            <KPICard
              title="P1 Priority Intents"
              value={String(kpiSummary.p1IntentCount)}
              subtitle="Immediate focus needed"
              color="#ef4444"
              trend={{ direction: 'neutral', label: 'high impact' }}
            />
            <KPICard
              title="Avg Resolution Rate"
              value={`${kpiSummary.avgResolutionRate.toFixed(1)}%`}
              subtitle="AI coverage across GMV bands"
              color="#8b5cf6"
              trend={{ direction: 'up', label: 'improving' }}
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
              title="Automation ROI & Cost Impact"
              subtitle="Quantifying the financial impact of AI automation"
              badge={{ text: 'UNIQUE INSIGHT', color: '#10b981' }}
            />
            <ChartCard
              title="Monthly Automation Savings"
              description="Track cost savings from AI-resolved vs human-resolved tickets over time."
              meta={insightMeta.automation}
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
              title="Handover Cost Leakage"
              subtitle="Identifying efficiency losses in the automation pipeline"
              badge={{ text: 'COST IMPACT', color: '#ef4444' }}
            />
            <ChartCard
              title="Handover Rate & Cost Premium"
              description="Every handover costs an additional $4.50 vs fully automated resolution."
              meta={insightMeta.handover}
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
              title="CSAT Early Warning System"
              subtitle="Detecting satisfaction trends before they become problems"
              badge={{ text: 'PREDICTIVE', color: '#f59e0b' }}
            />
            <ChartCard
              title="Intent Trend Analysis (14-day rolling)"
              description="Identify declining CSAT trends before they become critical."
              meta={insightMeta.csat}
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
              title="AI Training Priority Matrix"
              subtitle="Data-driven prioritization for maximum improvement ROI"
              badge={{ text: 'ACTIONABLE', color: '#3b82f6' }}
            />
            <ChartCard
              title="Volume vs CSAT Priority Scoring"
              description="Intents scored by combining volume percentile + CSAT improvement need."
              meta={insightMeta.priority}
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
              title="AI Revenue Impact"
              subtitle="Measuring AI's direct contribution to business outcomes"
              badge={{ text: 'BUSINESS VALUE', color: '#10b981' }}
            />
            <ChartCard
              title="GMV Influenced by AI Shopping Assistant"
              description="Revenue influenced when AI interactions occur within 24 hours before purchase."
              meta={insightMeta.revenue}
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
              title="Channel ROI Comparison"
              subtitle="Optimizing resource allocation across support channels"
              badge={{ text: 'EFFICIENCY', color: '#8b5cf6' }}
            />
            <ChartCard
              title="Volume Share vs Cost Share by Channel"
              description="Channels where volume share exceeds cost share are cost-effective."
              meta={insightMeta.channel}
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
              <span className={styles.dataNoteLabel}>Data Source</span>
              <span className={styles.dataNoteText}>
                Real-time BigQuery analytics from Gorgias CX Lab • Last updated: December 2025
              </span>
            </div>
          </motion.div>
        </div>
      </Container>

      <Footer />
    </>
  )
}
