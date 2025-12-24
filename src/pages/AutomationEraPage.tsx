import { useTranslation } from 'react-i18next'
import { Header, Footer, Container } from '@/components/layout'
import { IntroSection, StatsGrid, ChartSection, ClosingSection } from '@/components/sections'
import { AdoptionChart, CSATChart, HandoverChart, RevenueChart } from '@/components/charts'
import { statsData } from '@/data/mockData'
import { useDashboardStore } from '@/store/dashboardStore'

export function AutomationEraPage() {
  const { t } = useTranslation()
  const chartFilters = useDashboardStore((state) => state.chartFilters)

  return (
    <>
      <Header />

      <Container>
        <IntroSection title={t('intro.title')}>
          <p>{t('intro.paragraph1')}</p>
          <p style={{ marginTop: '1rem' }}>{t('intro.paragraph2')}</p>
        </IntroSection>

        <StatsGrid stats={statsData} />

        {/* Chart 1: Adoption */}
        <ChartSection
          title={t('sections.adoption.title')}
          insight={{
            title: t('sections.adoption.insightTitle'),
            content: t('sections.adoption.insightContent'),
          }}
          keyFinding={t('sections.adoption.keyFinding')}
          methodology={t('sections.adoption.methodology')}
          chartId="adoption"
          filters={chartFilters.adoption}
        >
          <AdoptionChart />
        </ChartSection>

        {/* Chart 2: CSAT */}
        <ChartSection
          title={t('sections.csat.title')}
          insight={{
            title: t('sections.csat.insightTitle'),
            content: t('sections.csat.insightContent'),
          }}
          keyFinding={t('sections.csat.keyFinding')}
          methodology={t('sections.csat.methodology')}
          chartId="csat"
          filters={chartFilters.csat}
        >
          <CSATChart />
        </ChartSection>

        {/* Chart 3: Handover */}
        <ChartSection
          title={t('sections.handover.title')}
          insight={{
            title: t('sections.handover.insightTitle'),
            content: t('sections.handover.insightContent'),
          }}
          keyFinding={t('sections.handover.keyFinding')}
          methodology={t('sections.handover.methodology')}
          chartId="handover"
          filters={chartFilters.handover}
        >
          <HandoverChart />
        </ChartSection>

        {/* Chart 4: Revenue */}
        <ChartSection
          title={t('sections.revenue.title')}
          insight={{
            title: t('sections.revenue.insightTitle'),
            content: t('sections.revenue.insightContent'),
          }}
          keyFinding={t('sections.revenue.keyFinding')}
          methodology={t('sections.revenue.methodology')}
          chartId="revenue"
          filters={chartFilters.revenue}
        >
          <RevenueChart />
        </ChartSection>

        <ClosingSection />
      </Container>

      <Footer />
    </>
  )
}
