# CX Lab POC - React Version

A modern, interactive data visualization dashboard built with React, TypeScript, Vite, and Framer Motion. This project showcases customer experience insights with beautiful animations and interactivity.

## Features

### Componentization & Modularity
- **30+ Reusable Components**: Organized into layout, UI, charts, sections, and animations
- **TypeScript**: Full type safety across the entire codebase
- **Path Aliases**: Clean imports with `@/` prefix for all modules
- **Component Categories**:
  - Layout: Header, Footer, Container, PageLayout
  - UI: Card, StatCard, InsightBox, KeyFinding, MethodologyBox, FilterControls
  - Charts: BaseChart, AdoptionChart, CSATChart, HandoverChart, RevenueChart
  - Sections: IntroSection, StatsGrid, ChartSection, ClosingSection
  - Animations: AnimatedPage, StaggeredContainer, FadeInUp, SlideIn, ScaleIn

### Interactive Elements
- **Chart Filters**: Toggle datasets on/off with animated checkboxes
- **Hover States**: All interactive elements respond to hover
- **Animated Tooltips**: Chart.js tooltips with custom styling
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **State Management**: Zustand for global filter state

### Framer-Motion Animations
- **Page Transitions**: Smooth fade + slide animations on route changes
- **Scroll-Triggered Animations**: Sections animate into view as you scroll
- **Staggered Reveals**: Stat cards appear one by one with delay
- **Number Counters**: Stats animate from 0 to target value
- **Hover Micro-Interactions**: Scale and shadow effects on interactive elements
- **Chart Entrance**: Charts draw in with easing animations
- **Filter Toggles**: Smooth transitions when toggling datasets

### Chart Interactivity
- **Interactive Tooltips**: Hover over data points to see detailed values
- **Dataset Filtering**: Click checkboxes to show/hide specific datasets
- **Animated Transitions**: Smooth animations when data changes
- **Responsive Charts**: Auto-resize on window change
- **Color-Coded Legends**: Clear visual mapping of datasets

## Tech Stack

- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Framer Motion 11** - Animation library
- **Chart.js 4.4 + react-chartjs-2** - Interactive charts
- **Zustand 5** - State management
- **React Router 6** - Client-side routing
- **React Query** - Data fetching (ready for API integration)

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Container, PageLayout
│   ├── ui/              # Reusable UI components
│   ├── charts/          # Chart components with filters
│   ├── sections/        # Page section components
│   └── animations/      # Animation wrapper components
├── pages/               # Route pages
├── hooks/               # Custom React hooks
├── store/               # Zustand state management
├── services/            # API clients & data transformers
├── data/                # Mock data & configurations
├── types/               # TypeScript type definitions
├── constants/           # Colors, animations, chart defaults
├── styles/              # Global CSS
└── utils/               # Helper functions
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Scaling to a CX Lab Ecosystem

This project is architected for scalability. Here are the planned growth paths:

### 1. Multiple Dashboards

**Current State**: Single dashboard (`/automation-era`)

**Scaling Plan**:
- Create dashboard config schema (`DashboardConfig` interface already defined)
- Add dashboards list page at `/dashboards`
- Dynamic dashboard routing: `/dashboards/:slug`
- Reuse existing chart and section components
- Add dashboard switcher in navigation

**Example Dashboards**:
- `/dashboards/automation-era` - Current dashboard
- `/dashboards/industry-benchmarks` - Compare metrics by industry
- `/dashboards/regional-insights` - Geographic breakdown
- `/dashboards/ticket-trends` - Deep dive into ticket types
- `/dashboards/agent-performance` - Team metrics

**Implementation**:
```typescript
// src/data/dashboardConfigs.ts
const dashboards: DashboardConfig[] = [
  {
    id: 'automation-era',
    slug: 'automation-era',
    title: 'The Automation Era',
    subtitle: 'How AI is reshaping ecommerce CX',
    stats: [...],
    sections: [...],
  },
  {
    id: 'industry-benchmarks',
    slug: 'industry-benchmarks',
    // ... configuration
  }
]
```

### 2. Real-Time Data Integration

**Current State**: Static mock data

**Scaling Plan**:
- Backend API endpoints:
  - `GET /api/dashboards` - List available dashboards
  - `GET /api/dashboards/:id/data` - Fetch dashboard data
  - `GET /api/charts/:chartId` - Individual chart data
  - `WebSocket /ws/realtime` - Live updates
- Data transformers already created in `/src/services/dataTransformers/`
- React Query for caching and background refetching
- Optimistic updates with rollback

**WebSocket Integration**:
```typescript
// src/services/websocket/socketClient.ts
class SocketClient {
  connect(url: string): void
  subscribe(channel: string, callback: Function): void
  // Auto-reconnection, heartbeat, error handling
}

// Usage in components
const { data, isConnected } = useRealTimeData('adoption')
```

**Benefits**:
- Live dashboard updates without refresh
- Push notifications for anomalies
- Real-time collaboration (multiple users viewing same dashboard)

### 3. User Authentication & Personalization

**Scaling Plan**:
- User accounts with authentication
- Saved dashboard preferences
- Custom dashboard creation
- Bookmarked metrics
- Scheduled reports via email
- Role-based access control (RBAC)

**Features**:
- Personal workspace: `/my-dashboards`
- Dashboard builder: Drag & drop widgets
- Saved filters and views
- Comparison mode: Compare time periods
- Export data as CSV/PDF

### 4. AI-Powered Insights

**Scaling Plan**:
- Anomaly detection highlights
- Predictive analytics overlays
- Natural language queries: "Show me CSAT trends for fashion brands"
- Auto-generated insights: "Your handover rate increased 15% this week"
- Recommended actions based on data

### 5. Collaborative Features

**Scaling Plan**:
- Comments on charts and insights
- Share dashboards via link
- Team workspaces
- Annotations and highlights
- Present mode for meetings
- Slack/Teams integration for alerts

### 6. Advanced Analytics

**Scaling Plan**:
- Cohort analysis
- Funnel visualizations
- Heatmaps and correlation matrices
- A/B test results tracking
- Custom metric builder
- Statistical significance indicators

### 7. Multi-Tenancy

**Scaling Plan**:
- White-label dashboard for each brand
- Brand-specific data isolation
- Custom branding (colors, logo, domain)
- Usage quotas and billing
- Admin panel for managing accounts

### 8. Mobile App

**Scaling Plan**:
- React Native app using shared components
- Push notifications for alerts
- Offline mode with sync
- Gesture-based interactions
- Voice commands

## Deployment

### Netlify (Recommended)

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Vercel

```bash
npm run build
vercel --prod
```

### GitHub Pages

```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## Environment Variables

Create `.env` for configuration:

```env
VITE_API_BASE_URL=https://api.your-domain.com
VITE_WS_URL=wss://api.your-domain.com/ws
VITE_ENABLE_ANALYTICS=true
```

## Performance Optimizations

Already implemented:
- Code splitting by route (React.lazy)
- Chart.js tree-shaking
- CSS modules for scoped styles
- Zustand for minimal re-renders
- Framer Motion viewport detection (animate once)
- Memoized chart data filtering

Future optimizations:
- Virtual scrolling for long lists
- Web Workers for data processing
- Service Worker for offline support
- CDN for static assets

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS 12+, Android 8+)

## Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management
- Color contrast (WCAG AA)
- Screen reader compatible

## Contributing

1. Create a feature branch
2. Make changes with tests
3. Submit PR with description
4. Await review

## License

Proprietary - Gorgias CX Lab

## Contact

For questions about scaling or implementation:
- Email: cx-lab@gorgias.com
- Slack: #cx-lab-engineering

---

Built with ❤️ by the Gorgias CX Lab team
