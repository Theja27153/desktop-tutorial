import { ServiceCategory } from "@/types";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "construction-support",
    slug: "construction-support",
    name: "Construction Support",
    description:
      "Turnkey site enablement, contractor coordination, and quality assurance for ground-up projects and refurbishments.",
    engagements: [
      "Site readiness assessments and feasibility checks",
      "Contractor and vendor orchestration with SLA management",
      "On-site safety, documentation, and compliance tracking",
    ],
    highlights: [
      "Dedicated on-site coordinators",
      "Digital reporting dashboard",
      "Rapid mobilization playbooks",
    ],
  },
  {
    id: "consulting-services",
    slug: "consulting-services",
    name: "Consulting Services",
    description:
      "Strategy through execution support across operations, expansion, and performance improvement initiatives.",
    engagements: [
      "Multi-unit expansion planning",
      "Process and cost optimization sprints",
      "PMO setup and governance",
    ],
    highlights: [
      "Cross-sector expertise",
      "Actionable data packs",
      "Executive alignment workshops",
    ],
  },
  {
    id: "data-services",
    slug: "data-services",
    name: "Data Services",
    description:
      "Data collection, validation, and analytics pods focused on operations intelligence and business reporting.",
    engagements: [
      "Data pipeline setup and QA",
      "Visualization packs and KPI scorecards",
      "Regulatory and ESG reporting support",
    ],
    highlights: [
      "Secure delivery workflows",
      "Domain-trained analysts",
      "Automation-ready models",
    ],
  },
  {
    id: "restaurant-operations",
    slug: "restaurant-operations",
    name: "Restaurant Operations & Services",
    description:
      "Kitchen and floor staff provisioning, supply chain partnering, and guest experience audits for restaurant brands.",
    engagements: [
      "Launch playbooks for new outlets",
      "Central kitchen coordination",
      "Compliance, hygiene, and CX audits",
    ],
    highlights: [
      "Pan-Telangana partner network",
      "24/7 escalation desk",
      "Performance dashboards",
    ],
  },
  {
    id: "franchise-management",
    slug: "franchise-management",
    name: "Franchise Management",
    description:
      "End-to-end franchise lifecycle services spanning partner onboarding, training, and revenue tracking.",
    engagements: [
      "Franchise recruitment and diligence",
      "Playbook and SOP design",
      "Tech-enabled performance monitoring",
    ],
    highlights: [
      "Modular rollout kits",
      "Local compliance expertise",
      "Co-branded marketing support",
    ],
  },
  {
    id: "digital-content-media",
    slug: "digital-content-media",
    name: "Digital Content & Media Solutions",
    description:
      "Modern storytelling studio building brand systems, content engines, and campaign analytics.",
    engagements: [
      "Brand identity and design systems",
      "Content production across mediums",
      "Paid media strategy and reporting",
    ],
    highlights: [
      "In-house creative squad",
      "Performance-first approach",
      "Omnichannel orchestration",
    ],
  },
];

export const serviceSelectOptions = serviceCategories.map((service) => ({
  label: service.name,
  value: service.id,
}));
