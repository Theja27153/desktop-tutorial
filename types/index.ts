export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status?: 'active' | 'inactive';
  lastLogin?: string;
  password?: string;
}

export interface AuthSession {
  token: string;
  user: User;
  expiresAt: number;
}

export interface DashboardSummary {
  totalInvoices: number;
  pending: number;
  approved: number;
  paid: number;
}

export type InvoiceStatus = 'Paid' | 'Pending' | 'Approved' | 'Overdue';

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
  clientName: string;
  projectName: string;
  serviceCategory: string;
  amount?: number; // Keep for backward compatibility if needed, or remove if fully replaced by total
  subtotal: number;
  gstRate: number;
  total: number;
  status: InvoiceStatus; // Updated status values to match mock-db
  date: string;
  dueDate?: string;
  items: InvoiceItem[];
  notes?: string;
  workerId?: string;
  attachments?: string[];
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon?: string;
  engagements: string[];
  highlights: string[];
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type?: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  responsibilities: string[];
  experience: string;
  postedDate?: string;
  requirements?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  sector: string;
  summary: string;
  outcome: string;
  metrics: string[];
}

export interface ValueProposition {
  id: string;
  title: string;
  description: string;
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
}
