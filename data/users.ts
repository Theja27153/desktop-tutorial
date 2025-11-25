import { User } from "@/types";

export const users: User[] = [
  {
    id: "worker-001",
    name: "Harsha Venkatesh",
    email: "harsha@padmavathi.co",
    password: "build@123",
    role: "Senior Operations Specialist",
    department: "Construction Support",
  },
  {
    id: "worker-002",
    name: "Srilatha Devi",
    email: "srilatha@padmavathi.co",
    password: "ops@123",
    role: "Finance Coordinator",
    department: "Central Operations",
  },
];

export const defaultWorkerId = users[0].id;
