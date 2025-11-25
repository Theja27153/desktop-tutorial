export type InvoiceStatus = "Pending" | "Approved" | "Paid";

export interface ValueProp {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  engagements: string[];
  highlights: string[];
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  sector: string;
  summary: string;
  outcome: string;
  metrics: string[];
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface LeadershipProfile {
  id: string;
  name: string;
  title: string;
  bio: string;
  focus: string;
  avatar?: string;
}

export interface JobPosting {
  id: string;
  title: string;
  location: "Karimnagar" | "Remote" | string;
  department: string;
  description: string;
  responsibilities: string[];
  experience: string;
}

export interface JobApplication {
  name: string;
  email: string;
  phone: string;
  positionId: string;
  experienceYears: number;
  message: string;
  resume?: File | null;
}

export interface ContactEnquiry {
  name: string;
  company?: string;
  email: string;
  phone: string;
  serviceId: string;
  message: string;
  attachment?: File | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  department: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  number: string;
  workerId: string;
  clientName: string;
  projectName: string;
  serviceCategory: string;
  date: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
  gstRate: number;
  subtotal: number;
  total: number;
  notes?: string;
  attachments?: string[];
}

export interface AuthSession {
  token: string;
  user: Pick<User, "id" | "name" | "email" | "role" | "department">;
  expiresAt: number;
}

export interface DashboardSummary {
  totalInvoices: number;
  pending: number;
  approved: number;
  paid: number;
}
