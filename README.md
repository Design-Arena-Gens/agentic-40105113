# DocumentManagement · Pharma Document Management System

Pharmaceutical-grade Document Management System (DMS) that supports GMP, ISO 9001, ICH Q7, and 21 CFR Part 11 requirements. The application provides controlled document registers, version management, electronic signatures, audit trails, and configurable workflows that suit highly regulated environments.

## ✨ Capabilities

- Electronic signatures with two-factor PIN verification aligned with 21 CFR Part 11
- Immutable audit trail with actor, role, timestamp, and contextual metadata
- Document lifecycle visualization and workflow task tracking
- Role-based access with configurable permissions per quality role
- Document type catalogue (manuals, SOPs, policies, templates, masters, etc.)
- Controlled document creation form capturing all required metadata
- Filters for security classification, status, and document type audits

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later (Next.js requirement)
- npm 9+ or pnpm/yarn if you prefer an alternative package manager

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to interact with the DMS.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 🗂️ Project Structure

```
├── app/                  # Next.js app router pages
├── public/               # Static assets (favicon, etc.)
├── src/
│   ├── components/       # UI building blocks
│   ├── data/             # Seed data and user directory
│   ├── lib/              # State management and utilities
│   └── types/            # Shared TypeScript definitions
├── tailwind.config.ts    # TailwindCSS configuration
└── ...                   # Configuration (tsconfig, eslint, etc.)
```

## 🛡️ Compliance Highlights

- **21 CFR Part 11** – PIN backed e-signatures, audit trails, immutable log entries
- **ISO 9001 & GMP** – Lifecycle controls, controlled vocabularies, role-based governance
- **ICH Q7** – Process/Procedure templates and QA checkpoints across workflows

## 🧪 Testing & Validation

The project currently focuses on interactive validation flows. For production readiness, integrate automated tests (e.g., Playwright/Cypress) that exercise signature capture, audit logging, and workflow completion.

## 📄 License

MIT — Use, adapt, and extend to fit your quality system requirements.
