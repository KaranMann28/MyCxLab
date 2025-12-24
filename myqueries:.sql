The Shift to Automation:
SELECT
  month_start,

  SUM(IF(handling_type = 'human_fully_resolved', SAFE_CAST(tickets AS INT64), 0)) AS human_fully_resolved,
  SUM(IF(handling_type = 'ai_fully_resolved', SAFE_CAST(tickets AS INT64), 0)) AS ai_fully_resolved,
  SUM(IF(handling_type = 'ai_handover', SAFE_CAST(tickets AS INT64), 0)) AS ai_handover,
  SUM(IF(handling_type = 'flows_fully_resolved', SAFE_CAST(tickets AS INT64), 0)) AS flows_fully_resolved

FROM `growth-ops-recruiting.growth_marketing_recruiting.MonthlyTicketHandlingEvolutionsince2024`
GROUP BY month_start
ORDER BY month_start;

CSAT by type:
SELECT
  month,
  csat_human_resolved,
  csat_all_ai_agent,
  csat_ai_agent_fully_resolved,
  csat_flows_fully_resolved,
  count_human_resolved,
  count_all_ai_agent,
  count_ai_agent_fully_resolved,
  count_flows_fully_resolved
FROM `growth-ops-recruiting.growth_marketing_recruiting.CSATbyInteractionType`
ORDER BY month;


Handover vs fully automated:
SELECT
  month_start AS month,
  handover_tickets,
  fully_automated_tickets,
  total_ai_agent_tickets,
  handover_percent,
  fully_automated_percent
FROM `growth-ops-recruiting.growth_marketing_recruiting.AIAgentTicketHandovervsFullyAutomatedTickets`
ORDER BY month;

Revenue influenced vs GMV:
SELECT
  month_start AS month,
  gmv_influenced,
  gmv_web,
  gmv_influenced_rate
FROM `growth-ops-recruiting.growth_marketing_recruiting.TotalRevenueInfluencedandTotalGMVin2025`
ORDER BY month;