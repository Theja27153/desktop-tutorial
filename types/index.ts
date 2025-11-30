export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'worker' | 'manager';
  status: 'active' | 'inactive';
  lastLogin?: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  dueDate: string;
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
