# Two-Week Sprint: CX Lab Launch

## Goal

Ship a working CX Lab first edition and measure real engagement within 14 days.

## Target Metric

**1,000 engaged viewers** in the first week after launch.

**Engaged = spent 2+ minutes on page OR interacted with a chart**

## Why This Metric

- It's concrete and measurable
- It tests both reach (can we get traffic?) and quality (is it engaging?)
- It's achievable but meaningful
- It indicates whether the Lab has legs

## Week 1: Build

### Day 1-2: Data & Strategy
**Tasks**
- [ ] Run all BigQuery queries, export to JSON
- [ ] Validate data quality (check for anomalies, missing values)
- [ ] Choose 2 key graphs based on strongest signal
- [ ] Draft hypothesis for each graph (what story does it tell?)

**Output**: Clean data files + 2-graph strategy doc

**Trade-off Accepted**: Using only 2 graphs instead of 4 to ship faster. Can add more in Edition 2.

### Day 3-4: Build Interactive Page
**Tasks**
- [ ] Set up project directory
- [ ] Integrate real data into index.html
- [ ] Write narrative sections for each graph
- [ ] Add methodology explanations
- [ ] Test on mobile and desktop
- [ ] Add basic analytics (GA4 + Mixpanel)

**Output**: Functioning interactive page

**Trade-off Accepted**: Manual data integration instead of automated pipeline. Automate in Week 3.

### Day 5: Content Variations
**Tasks**
- [ ] Use ChatGPT/Claude to generate:
  - 5 LinkedIn posts (carousel-style)
  - 1 Twitter/X thread (6-8 tweets)
  - Email announcement (2 versions: customer, prospect)
  - Blog post summary (500 words)
- [ ] Create 3-4 stat cards in Canva
- [ ] Draft outreach emails for partners

**Output**: Content package ready for distribution

**Trade-off Accepted**: AI-first drafts with light human editing. Won't be perfect, but good enough to test.

## Week 2: Launch & Measure

### Day 6-7: Setup Distribution
**Tasks**
- [ ] Deploy to Netlify (connect to GitHub repo)
- [ ] Set up custom domain (lab.gorgias.com or subdomain)
- [ ] Schedule LinkedIn posts in Buffer/Hootsuite
- [ ] Set up email campaign in Customer.io or Mailchimp
- [ ] Create retargeting pixel for visitors
- [ ] Build simple Zapier workflow: New visitor → Add to email list

**Output**: Distribution channels ready

**Trade-off Accepted**: Starting with 3 channels (LinkedIn, email, organic) instead of 10. Add more after validation.

### Day 8: Soft Launch (Internal + Small Segment)
**Tasks**
- [ ] Share with Gorgias team, gather feedback
- [ ] Send to 500 most engaged customers
- [ ] Post on company LinkedIn
- [ ] Monitor analytics closely
- [ ] Fix any bugs or UX issues

**Output**: Initial feedback, bug fixes

**Trade-off Accepted**: Small audience first to catch issues before full launch.

### Day 9: Iterate
**Tasks**
- [ ] Review feedback from soft launch
- [ ] Adjust narrative based on what resonates
- [ ] Optimize load time if needed
- [ ] A/B test two different LinkedIn captions
- [ ] Prepare full launch plan

**Output**: Refined version ready for broader audience

**Trade-off Accepted**: Quick iteration over perfection. Ship improvements daily.

### Day 10: Full Launch
**Tasks**
- [ ] Send to entire customer base (15,000 brands)
- [ ] Post on LinkedIn (company + team members)
- [ ] Publish blog post on Gorgias blog
- [ ] Send to email list
- [ ] Reach out to 5 partner companies
- [ ] Submit to ecommerce communities (Reddit, forums)

**Output**: CX Lab live and promoted across channels

**Trade-off Accepted**: Broad launch without paid ads. Organic first, paid later if needed.

### Day 11-14: Monitor & Optimize
**Tasks**
- [ ] Check analytics daily
- [ ] Respond to comments/questions
- [ ] Share user reactions on social
- [ ] Adjust distribution based on what's working
- [ ] Document learnings for Edition 2
- [ ] Start planning next theme

**Output**: Performance report + learnings doc

**Trade-off Accepted**: Manual monitoring instead of automated alerts. Add automation in Week 3.

## Metrics Dashboard

Track daily in a simple spreadsheet or Notion:

| Metric | Day 1 | Day 2 | Day 3 | Day 4 | Day 5 | Day 6 | Day 7 | Target |
|--------|-------|-------|-------|-------|-------|-------|-------|--------|
| Page views | | | | | | | | 2,500 |
| Unique visitors | | | | | | | | 1,500 |
| Engaged viewers | | | | | | | | 1,000 |
| Avg time on page | | | | | | | | 2:30 |
| Chart interactions | | | | | | | | 500 |
| Email signups | | | | | | | | 100 |
| Demo requests | | | | | | | | 5 |
| Social shares | | | | | | | | 50 |

## Success Criteria

**Must have (ship-blockers)**
- [ ] Data is accurate and validated
- [ ] Page loads in <3 seconds
- [ ] Charts render correctly on mobile and desktop
- [ ] Analytics tracking works
- [ ] No major bugs

**Nice to have (can wait)**
- [ ] Perfect color scheme
- [ ] Animated chart transitions
- [ ] Video explainers
- [ ] Advanced filters
- [ ] PDF export

## What We're NOT Doing (Yet)

To ship in 2 weeks, we're explicitly NOT doing:
- Custom backend/database
- User accounts or personalization
- Advanced filtering by industry/size
- Video content
- Paid advertising
- Partner co-branding
- Translation/localization
- Mobile app
- API for third parties

These can come in future editions if the core concept proves valuable.

## Risk Mitigation

### Risk 1: Data quality issues
**Mitigation**: Validate data on Day 1-2, have backup queries ready

### Risk 2: Low engagement
**Mitigation**: Pre-seed with internal team sharing, use paid promotion if organic falls short

### Risk 3: Technical problems
**Mitigation**: Test thoroughly on Day 3-4, have rollback plan

### Risk 4: Scope creep
**Mitigation**: Strict 2-week deadline, ruthlessly cut nice-to-haves

### Risk 5: AI-generated content is off-brand
**Mitigation**: Human review all public-facing content, iterate prompts

## Decision Framework

When something comes up during the sprint, use this framework:

**Does it help us hit 1,000 engaged viewers in Week 1?**
- **Yes**: Do it
- **No**: Defer to Edition 2
- **Maybe**: Do the minimal version

Examples:
- "Should we add video explanations?" → **No** (defer)
- "Should we add social sharing buttons?" → **Yes** (helps distribution)
- "Should we create an API?" → **No** (defer)
- "Should we test on mobile?" → **Yes** (critical for engagement)

## Daily Standups

**What did we ship yesterday?**
**What are we shipping today?**
**What's blocking us?**

Keep it fast (15 min max). Focus on forward motion.

## Success Looks Like

### Week 1
- Interactive page is live
- Real data is integrated
- 2 compelling graphs with narrative
- Distribution channels are set up

### Week 2
- 1,000+ engaged viewers
- 50+ social shares
- 5+ demo requests
- Clear signal that people care about the content
- Documented learnings for next edition

### Week 3+ (if successful)
- Edition 2 planned and in motion
- Automation workflow built (n8n)
- Expanded to 4 graphs
- New distribution channels added
- Paid promotion if ROI justifies it

## What We'll Learn

Even if we miss the 1,000 viewer target, we'll learn:
- Which graphs resonate most
- Which distribution channels work
- What narrative style engages people
- Where users drop off
- What questions people ask
- Whether the concept has legs

This data informs Edition 2.

## Budget

**Required**
- Hosting: $0 (Netlify free tier)
- Domain: $12/year (if not using subdomain)
- OpenAI API: $20 (content generation)
- **Total: ~$32**

**Optional**
- Buffer/Hootsuite: $0 (free tier or trial)
- Canva: $0 (free tier)
- Analytics: $0 (GA4 + Mixpanel free tier)

**If we need to boost distribution:**
- LinkedIn ads: $200-500
- Partner outreach tool: $50/month

## Post-Launch Review (End of Week 2)

Answer these questions:
1. Did we hit 1,000 engaged viewers? Why or why not?
2. Which graph got more engagement?
3. Which distribution channel drove the most traffic?
4. What was the most common feedback?
5. What would we do differently in Edition 2?
6. Is this worth continuing? Why?

## Iteration Plan (Week 3-4)

If Edition 1 succeeds:
- [ ] Automate data pipeline (n8n)
- [ ] Add 2 more graphs
- [ ] Set up email capture for gated insights
- [ ] Build partner co-branded versions
- [ ] Create video walkthrough
- [ ] Plan Edition 2 theme

If Edition 1 underperforms:
- [ ] Analyze where engagement dropped
- [ ] Test different narrative styles
- [ ] Try different distribution channels
- [ ] Validate the core premise (do people care about CX data?)
- [ ] Decide: Pivot or persist?

## The Tradeoffs We're Making

### Speed vs Perfection
**Choice**: Ship in 2 weeks with 2 graphs, imperfect copy, basic design
**Why**: Better to learn from real usage than polish in a vacuum

### Automation vs Manual
**Choice**: Manual data integration for Edition 1
**Why**: Automation takes time; manual works for proving the concept

### Breadth vs Depth
**Choice**: 3 distribution channels done well instead of 10 done poorly
**Why**: Focus beats spray-and-pray

### Features vs Simplicity
**Choice**: Static page with interactive charts, no user accounts or personalization
**Why**: Every feature is a potential bug and maintenance burden

### Paid vs Organic
**Choice**: Organic-first, paid only if needed to hit target
**Why**: Proves the content has intrinsic value before paying for reach

## What Good Looks Like

### At the end of Week 1:
- Someone from the team can open the page and say "I'd share this"
- The data tells a clear story without needing explanation
- The page loads fast and works on phones

### At the end of Week 2:
- 1,000+ people spent real time engaging with the content
- At least 5 people asked "when's the next one?"
- The Gorgias team is proud to share it externally
- We have a clear roadmap for Edition 2

### At the end of Month 1:
- 3,000+ total engaged viewers
- 10+ demo requests attributed to the Lab
- 2-3 media mentions or backlinks
- Partner interest in co-distribution
- Edition 2 is already in flight

## Final Checklist (Before Launch)

**Content**
- [ ] All data is accurate
- [ ] Narrative is clear and compelling
- [ ] No typos or grammatical errors
- [ ] Methodology is explained
- [ ] CTA is clear ("Share this" or "Contact us")

**Technical**
- [ ] Page loads in <3 seconds
- [ ] Charts render on Chrome, Safari, Firefox
- [ ] Mobile experience is good
- [ ] Analytics are tracking correctly
- [ ] No console errors

**Distribution**
- [ ] Email is scheduled
- [ ] LinkedIn posts are queued
- [ ] Blog post is ready
- [ ] Partner outreach is drafted
- [ ] Team knows to share on personal accounts

**Measurement**
- [ ] Dashboard is set up to track metrics
- [ ] We know how we'll evaluate success
- [ ] Someone is assigned to monitor daily

---

**The mantra: Ship, measure, iterate. Everything else is noise.**
