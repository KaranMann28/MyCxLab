import { Routes, Route } from 'react-router-dom'
import { PageLayout } from '@/components/layout'
import { AutomationEraPage, InsightsDashboard } from '@/pages'

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        {/* New Insights Dashboard as default - uses real BigQuery data */}
        <Route index element={<InsightsDashboard />} />
        <Route path="insights" element={<InsightsDashboard />} />
        {/* Legacy automation era page with mock data */}
        <Route path="automation-era" element={<AutomationEraPage />} />
      </Route>
    </Routes>
  )
}

export default App
