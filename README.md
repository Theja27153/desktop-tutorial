## Padmavathi Constructions · Digital Presence

A production-ready Next.js 16 + TypeScript platform that serves both the public marketing site and the internal worker portal for Padmavathi Constructions (Karimnagar, Telangana). The solution ships with responsive UI, mock authentication, invoice workflows, and clearly defined data boundaries for future database integration.

### Tech Stack
- Next.js App Router, React 19, TypeScript
- Tailwind CSS (design tokens defined via CSS `@theme`)
- Next API Routes for mock auth, enquiries, applications, invoices, and profile updates
- Modular data & utility layers (`/data`, `/lib`, `/types`)

### Project Structure
```
app/
  (site)/            # Public website pages with shared layout (Navbar + Footer)
  login/             # Auth experience
  portal/            # Authenticated worker portal with its own layout
  api/               # REST-style route handlers (auth, invoices, enquiries, careers, profile)
components/
  layout/ | ui/ | forms/ | portal/ utilities for consistent UI patterns
data/                # Mock datasets (services, jobs, invoices, users, company info)
lib/                 # Auth/session helpers, mock DB operations, utility helpers
types/               # Shared TypeScript interfaces
middleware.ts        # Route protection + login redirect rules
```

## Getting Started
```bash
npm install
npm run dev
# visit http://localhost:3000
```

### Default Portal Credentials
| Email                  | Password  | Role                         |
|------------------------|-----------|------------------------------|
| `harsha@padmavathi.co` | `build@123` | Senior Operations Specialist |

Middleware automatically redirects `/portal/*` visitors to `/login` if the mock session cookie is missing. Successful login sets an HTTP-only cookie that protects all portal routes.

## Feature Highlights
- **Corporate Website**
  - Home, About, Services, Careers, and Contact experiences aligned to burgundy (#9c1312) & green (#4b8339) palette.
  - Verticals, value propositions, case studies, leadership, and timeline data rendered from `/data`.
  - Services page includes deep dives plus a service-specific enquiry form that posts to `/api/enquiry`.
  - Careers page shows five sample openings and a validated application form that posts to `/api/careers/apply`.
  - Contact page reuses the enquiry form, while surfacing office, hours, and contact details.

- **Worker Portal**
  - Email/password login with mock session management (`/api/auth/login`, `middleware.ts`, `lib/auth.ts`).
  - Dashboard displays KPIs, quick navigation, and recent invoices.
  - Invoice workflows: list view, detail view with printable layout, and dynamic creation form (auto line-item math, GST, file uploads placeholder, success messaging).
  - Profile page with editable details saved via `/api/profile`.
  - APIs use `lib/mock-db.ts` for in-memory storage, making it easy to swap in a real database later.

- **Design System & Accessibility**
  - Reusable buttons, cards, stats, nav, and form field wrappers keep UI consistent.
  - Semantic HTML, aria labels for interactive controls, keyboard-friendly styles, and color-contrast friendly palette.
  - SEO-friendly metadata (titles, descriptions, Open Graph) defined in `app/layout.tsx` and per-page metadata exports.

## Mock Data & Future DB Integration
- All entities (services, jobs, invoices, users, case studies) live under `/data`.
- `lib/mock-db.ts` exposes CRUD-like helpers (`createInvoice`, `listInvoices`, `updateWorkerProfile`, etc.) so replacing with Prisma/ORM only requires swapping implementations.
- Types for `User`, `Invoice`, `ServiceCategory`, `JobPosting`, etc. live in `/types` to keep contracts strongly typed across API routes and UI layers.

### Suggested Enhancements
1. Replace mock sessions with NextAuth/Auth.js or an internal identity provider + persistent tokens.
2. Connect `lib/mock-db.ts` to a real database (Prisma + PostgreSQL) and persist invoices, jobs, and applications.
3. Integrate a file storage service (S3, Cloudinary) for attachments and CV uploads.
4. Wire the enquiry and application API routes to CRM/ticketing tools (HubSpot, Freshdesk) or email.
5. Add PDF generation for invoices via serverless functions (e.g., @react-pdf/renderer or headless Chrome).

## Available Scripts
- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run start` – run the production server
- `npm run lint` – lint the codebase with ESLint

With the above structure and mocks in place, the repository is ready for immediate deployment and offers clear seams for future integrations (DB, auth provider, storage, CRM). Let us know if you need deployment manifests or infrastructure-as-code templates next. 
