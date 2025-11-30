import { ValueProposition, CaseStudy, TimelineEntry, LeadershipProfile } from "@/types";

export const valuePropositions: ValueProposition[] = [
  {
    id: "multi-sector",
    title: "Multi-sector command",
    description:
      "A single partner who understands construction, retail, F&B, data, and media operations in depth.",
  },
  {
    id: "governance",
    title: "Governance-first delivery",
    description:
      "Transparent reporting cadence, risk tracking, and executive-ready documentation from day one.",
  },
  {
    id: "people-network",
    title: "Specialist talent network",
    description:
      "Bench of engineers, analysts, chefs, and marketers trained on Padmavathi playbooks.",
  },
  {
    id: "technology",
    title: "Technology-enabled control",
    description:
      "Dashboards, automations, and secure portals keep every engagement measurable and scalable.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "smart-industrial-park",
    title: "Smart Industrial Park Enablement",
    sector: "Construction Support",
    summary:
      "Deployed cross-functional site coordination for a 1M sq.ft industrial park in Telangana.",
    outcome:
      "Cut contractor turnaround time by 28% and achieved zero lost-time incidents during commissioning.",
    metrics: ["45 vendors orchestrated", "8-month delivery window", "Zero NCRs"],
  },
  {
    id: "restaurant-scale",
    title: "Restaurant Scale-up Program",
    sector: "Restaurant Operations",
    summary:
      "Rolled out 12 cloud-kitchen locations with unified supply, training, and CX governance.",
    outcome:
      "Achieved 98% audit compliance scores and positive unit economics within 60 days of launch.",
    metrics: ["12 launches in 90 days", "98% hygiene scores", "60-day payback"],
  },
  {
    id: "data-command-center",
    title: "Data Command Center",
    sector: "Data Services",
    summary:
      "Built analytics pods for a diversified franchise group to centralize reporting and forecasting.",
    outcome:
      "Reduced manual reporting time by 40 hours a week and enabled real-time KPI tracking.",
    metrics: ["40 hrs/week saved", "Single source of truth", "Executive dashboards"],
  },
];

export const companyTimeline: TimelineEntry[] = [
  {
    year: "2018",
    title: "Founding",
    description:
      "Padmavathi Constructions incorporated in Karimnagar to support regional infrastructure projects.",
  },
  {
    year: "2019",
    title: "Consulting & Data",
    description:
      "Launched consulting desk and data pods to serve diversified commercial clients.",
  },
  {
    year: "2021",
    title: "Hospitality expansion",
    description:
      "Introduced restaurant operations and franchise management practices across Telangana.",
  },
  {
    year: "2023",
    title: "Digital studio",
    description:
      "Built dedicated digital content and media team to support brand storytelling needs.",
  },
  {
    year: "2024+",
    title: "Technology-first operations",
    description:
      "Investing in proprietary platforms connecting clients, workforce, and leadership in real time.",
  },
];

export const leadershipTeam: LeadershipProfile[] = [
  {
    id: "sai-theja-thallam",
    name: "Sai Theja Thallam",
    title: "Founder & Owner",
    bio: "Sai Theja Thallam is the driving force behind Padmavathi Constructions, transforming it from a regional construction firm into a diversified commercial powerhouse. With a vision that bridges local expertise and global standards, Sai has expanded the company's portfolio to include data services, hospitality, and digital media. His leadership is defined by a commitment to operational excellence and a 'governance-first' approach, ensuring that every project—whether a high-rise in Karimnagar or a data analytics pod—delivers measurable value. Splitting his time between India and the US, Sai brings a unique cross-cultural perspective to business scaling and strategic partnerships.",
    focus: "Strategy & Global Operations",
  },
];
