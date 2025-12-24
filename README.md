# Gorgias CX Lab - Proof of Concept

An interactive micro-experience that transforms CX data into compelling insights.

## What's included

- **4 key visualizations** with interactive filters and hover states
- **Narrative context** for each insight explaining "why it matters"
- **Methodology sections** for transparency
- **Responsive design** that works on desktop and mobile
- **Sample data** ready to be replaced with real BigQuery results

## Quick Start

1. **View the POC locally**
   ```bash
   cd cx-lab-poc
   open index.html
   ```
   Or simply double-click `index.html` to open in your browser.

2. **Replace with real data**

   The current version uses synthetic data that matches the expected patterns. To use real BigQuery data:

   a. Run the SQL queries from BigQuery (see below)
   b. Export results as JSON
   c. Replace the data arrays in the `<script>` section of `index.html`

## SQL Queries for Real Data

### Query 1: Adoption Trend
```sql
SELECT
  DATE_TRUNC(ticket_date, MONTH) AS month,
  SUM(IF(resolution_type = 'human', 1, 0)) AS human_resolved,
  SUM(IF(resolution_type = 'ai_fully_resolved', 1, 0)) AS ai_fully_resolved,
  SUM(IF(resolution_type = 'ai_handover', 1, 0)) AS ai_handover,
  SUM(IF(resolution_type = 'flow', 1, 0)) AS flow_resolved
FROM `growth_marketing_recruiting.interaction_metrics`
GROUP BY month
ORDER BY month;
```

### Query 2: CSAT by Resolution Type
```sql
SELECT
  resolution_type,
  DATE_TRUNC(ticket_date, QUARTER) AS quarter,
  AVG(csat_score) AS avg_csat
FROM `growth_marketing_recruiting.interaction_metrics`
WHERE csat_score IS NOT NULL
GROUP BY resolution_type, quarter
ORDER BY quarter, resolution_type;
```

### Query 3: Handover vs Fully Automated
```sql
SELECT
  DATE_TRUNC(ticket_date, MONTH) AS month,
  ROUND(100.0 * SUM(IF(resolution_type = 'ai_handover', 1, 0)) /
    (SUM(IF(resolution_type = 'ai_handover', 1, 0)) +
     SUM(IF(resolution_type = 'ai_fully_resolved', 1, 0))), 1) AS handover_pct,
  ROUND(100.0 * SUM(IF(resolution_type = 'ai_fully_resolved', 1, 0)) /
    (SUM(IF(resolution_type = 'ai_handover', 1, 0)) +
     SUM(IF(resolution_type = 'ai_fully_resolved', 1, 0))), 1) AS fully_auto_pct
FROM `growth_marketing_recruiting.interaction_metrics`
WHERE resolution_type IN ('ai_handover', 'ai_fully_resolved')
GROUP BY month
ORDER BY month;
```

### Query 4: Revenue Influenced
```sql
SELECT
  DATE_TRUNC(event_date, MONTH) AS month,
  ROUND(SUM(revenue_influenced) / 1000000, 1) AS revenue_influenced_m,
  ROUND(SUM(total_gmv) / 1000000, 1) AS total_gmv_m
FROM `growth_marketing_recruiting.revenue_metrics`
GROUP BY month
ORDER BY month;
```

## How to Replace Data

1. Run each query in BigQuery
2. Export results as JSON or CSV
3. Open `index.html` and find the data section (around line 330)
4. Replace the arrays in each dataset:

```javascript
// Example for adoption data
const adoptionData = {
    labels: ['Jan 24', 'Feb 24', ...], // Your month labels
    datasets: [
        {
            label: 'Human Resolved',
            data: [850, 840, 855, ...], // Replace with your query results
            // ... rest stays the same
        }
    ]
};
```

## Features

### Interactive Filters
- Click legend items or checkboxes to show/hide data series
- Hover over data points for detailed tooltips
- Responsive layout adapts to screen size

### Key Insights
Each chart includes:
- "Why this matters" context box
- Key findings callout
- Methodology explanation

### Design Principles
- Clean, professional aesthetic
- High contrast for readability
- Consistent color palette
- No clutter, no jargon

## Next Steps

### To make this production-ready:

1. **Connect to live data**
   - Set up automated BigQuery exports
   - Use a backend API to serve data dynamically
   - Or use a static site generator with scheduled rebuilds

2. **Add more interactivity**
   - Date range selectors
   - Industry filters
   - Merchant size segments

3. **Deploy**
   - Host on Netlify, Vercel, or GitHub Pages
   - Add custom domain (e.g., lab.gorgias.com)
   - Set up analytics to track engagement

4. **Distribution**
   - Create social media snippets from key findings
   - Generate PDF export version
   - Build email templates with chart previews

## Tech Stack

- **Chart.js** - Lightweight, flexible charting
- **Vanilla JavaScript** - No framework overhead
- **CSS Grid** - Responsive layout
- **Single HTML file** - Easy to deploy anywhere

## File Structure

```
cx-lab-poc/
├── index.html          # Complete single-page app
└── README.md          # This file
```

## Notes

- The current data is synthetic but follows realistic patterns from the dashboard analysis
- All interactivity is client-side - no backend required
- Charts are fully responsive and accessible
- Total file size is ~15KB (excluding Chart.js CDN)

## Questions?

This POC demonstrates the core experience. The next step is plugging in real data and refining the narrative based on actual patterns you discover in BigQuery.
# MyCxLab
