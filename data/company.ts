import {
  LeadershipProfile,
  ProjectCaseStudy,
  TimelineEntry,
  ValueProp,
} from "@/types";

export const valuePropositions: ValueProp[] = [
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

export const caseStudies: ProjectCaseStudy[] = [
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
    id: "padma-reddy",
    name: "Padma Reddy",
    title: "Founder & Managing Director",
    bio: "Civil engineer turned entrepreneur overseeing strategy and partnerships across all verticals.",
    focus: "Growth & Governance",
  },
  {
    id: "vikram-sharma",
    name: "Vikram Sharma",
    title: "Director, Operations & Franchise",
    bio: "Leads multi-city rollout programs and franchise operations with an eye on quality metrics.",
    focus: "Operational Excellence",
  },
  {
    id: "meera-kumar",
    name: "Meera Kumar",
    title: "Head of Digital & Data",
    bio: "Drives the analytics practice, digital studio, and data-driven decision support for clients.",
    focus: "Technology & Insights",
  },
];
