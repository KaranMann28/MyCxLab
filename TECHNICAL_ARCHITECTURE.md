# Technical Architecture: CX Lab System

## System Overview

The CX Lab is a data-to-insight pipeline that transforms raw BigQuery data into a polished, interactive public experience. The architecture prioritizes automation, scalability, and maintainability.

## High-Level Flow

```
BigQuery → Data Pipeline → Content Generation → Distribution → Analytics
    ↓           ↓                ↓                   ↓            ↓
Raw data → JSON export → HTML + Charts → Multi-channel → Feedback loop
```

## Component Breakdown

### 1. Data Layer

**Source: Google BigQuery**
- Tables: `interaction_metrics`, `revenue_metrics`, `csat_scores`
- Update frequency: Daily or weekly (depending on data freshness needs)
- Access: Service account with read-only permissions

**Data Pipeline**
- **Tool**: n8n or Apache Airflow
- **Process**:
  1. Scheduled trigger (e.g., every Monday at 6am)
  2. Execute SQL queries against BigQuery
  3. Export results to JSON
  4. Store in cloud storage (Google Cloud Storage or S3)
  5. Trigger downstream workflows

**Alternative (Simpler)**
- Manually run queries in BigQuery UI
- Export to JSON
- Upload to static site directory
- Rebuild site (if using static site generator)

### 2. Processing Layer

**Data Transformation**
- **Tool**: Custom JavaScript (data-converter.js)
- **Process**:
  - Parse BigQuery JSON
  - Convert to Chart.js format
  - Calculate derived metrics (percentages, ratios)
  - Handle missing data gracefully

**Content Generation**
- **Tool**: OpenAI API or Claude API
- **Process**:
  1. Feed data + context to LLM
  2. Generate narrative sections
  3. Create social media variations
  4. Format for each distribution channel
  5. Save outputs to files

**Example Prompt Template**:
```
You are writing for the Gorgias CX Lab, an insights hub for ecommerce operators.

Data: [Insert key metrics]

Create a 2-3 paragraph narrative that:
- Explains what the data shows
- Highlights why it matters to ecommerce businesses
- Suggests one actionable takeaway

Tone: Clear, direct, no jargon. Respect the reader's time.
```

### 3. Presentation Layer

**Frontend Stack**
- **HTML5**: Semantic markup
- **CSS3**: Custom styling (no framework needed for MVP)
- **Chart.js**: Interactive charts
- **Vanilla JavaScript**: Interactivity and filters

**Why this stack?**
- No build step required
- Works anywhere (CDN, static host, CMS)
- Fast load times (<2s)
- Easy to maintain

**Hosting Options**
- **Netlify** (recommended): Git-based deployment, global CDN, free SSL
- **Vercel**: Similar to Netlify, excellent performance
- **GitHub Pages**: Free, simple, but less features
- **AWS S3 + CloudFront**: More control, more complexity
- **Gorgias subdomain**: lab.gorgias.com

**Progressive Enhancement**
- Core content readable without JavaScript
- Charts enhance the experience but aren't mandatory
- Works on mobile and desktop

### 4. Distribution Layer

**Automation Workflow (n8n)**

```
Node 1: Trigger (Schedule or Webhook)
  ↓
Node 2: Fetch data from Cloud Storage
  ↓
Node 3: Send to OpenAI API for content generation
  ↓
Node 4a: Post to LinkedIn (LinkedIn API)
Node 4b: Send email (Customer.io API)
Node 4c: Update website (GitHub API to commit)
Node 4d: Create Twitter thread (Buffer API)
Node 4e: Notify Slack (Slack webhook)
  ↓
Node 5: Log to database for tracking
```

**Opal Alternative**
- Similar workflow builder to n8n
- More focused on marketing automation
- Better for non-technical users

**n8n vs Opal vs Zapier**
- **n8n**: Self-hosted, unlimited workflows, more control
- **Opal**: Cloud-hosted, marketing-focused, easier setup
- **Zapier**: Quickest to start, more expensive at scale

**Recommendation**: Start with Zapier for speed, migrate to n8n if cost becomes an issue.

### 5. Analytics Layer

**Tracking Stack**
- **Google Analytics 4**: Traffic sources, conversions
- **Mixpanel**: User interactions (chart filters, hovers)
- **Hotjar**: Session recordings, heatmaps
- **Custom events**: Chart.js interaction tracking

**Implementation**
```javascript
// Track chart interactions
chart.options.onClick = (event, elements) => {
    if (elements.length > 0) {
        gtag('event', 'chart_interaction', {
            'chart_name': 'adoption_trend',
            'dataset': elements[0].datasetIndex,
            'value': elements[0].index
        });
    }
};
```

**Key Metrics to Track**
- Page views and unique visitors
- Average time on page
- Scroll depth
- Chart interactions (hover, click, filter)
- Conversion events (email signup, demo request)
- Traffic sources
- Bounce rate by source

## Workflow Automation (n8n)

### Workflow 1: Weekly Data Update

```json
{
  "name": "CX Lab Data Update",
  "nodes": [
    {
      "type": "Cron",
      "parameters": {
        "mode": "everyWeek",
        "hour": 6,
        "minute": 0,
        "timezone": "America/New_York"
      }
    },
    {
      "type": "GoogleBigQuery",
      "parameters": {
        "query": "SELECT * FROM interaction_metrics...",
        "projectId": "gorgias-data"
      }
    },
    {
      "type": "Code",
      "parameters": {
        "jsCode": "// Transform data to Chart.js format\nreturn convertAdoptionData(items);"
      }
    },
    {
      "type": "GoogleCloudStorage",
      "parameters": {
        "operation": "upload",
        "bucketName": "cx-lab-data",
        "fileName": "latest-data.json"
      }
    },
    {
      "type": "Webhook",
      "parameters": {
        "url": "https://api.netlify.com/build_hooks/...",
        "method": "POST"
      }
    }
  ]
}
```

### Workflow 2: Content Distribution

```json
{
  "name": "CX Lab Distribution",
  "nodes": [
    {
      "type": "Webhook",
      "parameters": {
        "path": "cx-lab-publish"
      }
    },
    {
      "type": "OpenAI",
      "parameters": {
        "model": "gpt-4",
        "messages": [
          {
            "role": "system",
            "content": "You are creating social media content for the Gorgias CX Lab..."
          }
        ]
      }
    },
    {
      "type": "LinkedIn",
      "parameters": {
        "operation": "createPost",
        "text": "{{$json.content}}"
      }
    },
    {
      "type": "Buffer",
      "parameters": {
        "operation": "createPost",
        "text": "{{$json.content}}",
        "profile": "twitter"
      }
    },
    {
      "type": "CustomerIO",
      "parameters": {
        "operation": "sendEmail",
        "segment": "cx-lab-subscribers",
        "subject": "{{$json.subject}}",
        "body": "{{$json.body}}"
      }
    }
  ]
}
```

## AI Tools Used

### Content Generation
- **OpenAI GPT-4**: Primary narrative writing
- **Claude**: Alternative for longer-form content
- **Jasper**: SEO-optimized blog posts

### Visual Creation
- **Chart.js**: Core chart rendering
- **Canva API**: Social media graphics
- **Figma**: Design templates (manual, but can be automated with plugins)

### Data Analysis
- **BigQuery ML**: Predict trends, identify anomalies
- **Julius AI**: Quick data exploration

### Workflow Orchestration
- **n8n**: Self-hosted automation
- **Zapier**: Quick integrations
- **Make (formerly Integromat)**: Visual workflow builder

## What Breaks First When Scaling

### Problem 1: Data Freshness
**Symptom**: Users see outdated data, metrics don't reflect recent changes
**Cause**: Manual update process or infrequent refresh schedule
**Solution**:
- Automate BigQuery exports (n8n cron job)
- Set up data validation to catch stale data
- Add "Last updated" timestamp to UI
- Alert if data hasn't updated in X days

### Problem 2: Content Quality Drift
**Symptom**: AI-generated narratives become generic or inaccurate
**Cause**: Using the same prompts over time without refinement
**Solution**:
- Version control prompts in Git
- Human review before publishing
- A/B test different narrative styles
- Fine-tune models on high-performing content

### Problem 3: API Rate Limits
**Symptom**: Workflows fail during distribution phase
**Cause**: Hitting API limits on LinkedIn, Twitter, OpenAI, etc.
**Solution**:
- Implement exponential backoff
- Batch requests where possible
- Upgrade to higher API tiers
- Spread distribution across time (don't post everything at once)

### Problem 4: Maintenance Burden
**Symptom**: Updating charts, copy, or design becomes time-consuming
**Cause**: Too much custom code, no templating system
**Solution**:
- Use templating language (Handlebars, Liquid)
- Separate data from presentation
- Document everything
- Build a simple CMS for non-technical editors

### Problem 5: Analytics Overload
**Symptom**: Too much data, not enough insight
**Cause**: Tracking everything without clear success metrics
**Solution**:
- Define 3-5 North Star metrics
- Create automated reports (weekly email digest)
- Use AI to surface anomalies
- Focus on actionable insights, not vanity metrics

### Problem 6: Distribution Fatigue
**Symptom**: Engagement drops over time
**Cause**: Audience sees same format repeatedly
**Solution**:
- Vary content formats (video, interactive, text)
- Test new channels (TikTok, podcasts)
- Segment audience by engagement level
- Don't over-publish (quality > quantity)

## Scaling Path

### Phase 1: MVP (Weeks 1-2)
- Manual data export from BigQuery
- Single interactive page
- 2-3 distribution channels (email, LinkedIn)
- Basic Google Analytics

### Phase 2: Automation (Weeks 3-4)
- n8n workflow for data updates
- AI-assisted content generation
- 5-6 distribution channels
- Enhanced analytics (Mixpanel)

### Phase 3: Optimization (Weeks 5-8)
- A/B testing narratives and formats
- Personalization by industry/segment
- SEO optimization
- Partner distribution

### Phase 4: Scale (Weeks 9+)
- Weekly or bi-weekly editions
- Multiple CX themes running in parallel
- Community features (comments, sharing)
- API for partners to embed CX Lab data

## Security & Privacy

**Data Handling**
- Only use aggregated, anonymized data
- No merchant-identifiable information in public Lab
- GDPR/CCPA compliant

**Access Control**
- BigQuery service account with minimal permissions
- API keys stored in environment variables (not in code)
- n8n workflows encrypted at rest

**Monitoring**
- Set up error alerts (Sentry, Rollbar)
- Monitor API usage to detect abuse
- Regular security audits

## Cost Estimates (Monthly)

**MVP**
- Netlify hosting: $0 (free tier)
- n8n (self-hosted): $10-20 (server costs)
- OpenAI API: $50-100 (depending on usage)
- Analytics: $0 (GA4 + basic Mixpanel)
- **Total: ~$100/month**

**Scaled**
- Hosting: $50 (upgraded tier)
- n8n: $50 (larger server)
- OpenAI API: $200-300
- Analytics: $100 (Mixpanel paid tier)
- Distribution APIs: $100 (Buffer, Customer.io)
- **Total: ~$500-600/month**

**Much cheaper than hiring a full-time person** (even at $60k/year salary = $5k/month).

## Success Metrics

**Output**
- 1 CX Lab edition every 2-4 weeks
- 8-12 derivative content pieces per edition

**Engagement**
- 10,000+ page views per edition (within first month)
- 3+ minutes average time on page
- 30%+ chart interaction rate

**Business Impact**
- 100+ leads per edition (gated downloads)
- 10+ demo requests attributed to Lab
- 20+ media mentions per quarter

## Deployment Checklist

- [ ] Set up BigQuery access (service account)
- [ ] Create n8n instance (cloud or self-hosted)
- [ ] Build data transformation scripts
- [ ] Set up OpenAI API key
- [ ] Create content generation prompts
- [ ] Build interactive frontend
- [ ] Set up hosting (Netlify/Vercel)
- [ ] Configure custom domain
- [ ] Implement analytics tracking
- [ ] Create distribution workflows
- [ ] Test end-to-end pipeline
- [ ] Document everything
- [ ] Launch to small audience first
- [ ] Iterate based on feedback
- [ ] Scale distribution

## Next Steps

1. **This week**: Finalize data sources, build MVP page
2. **Next week**: Set up basic automation (data refresh)
3. **Week 3**: Add AI content generation
4. **Week 4**: Launch first edition, measure results

The goal is to build something that works first, then automate and scale it. Don't over-engineer the first version.
