# SangamSetu (संगमसेतु) — National Innovation Procurement Portal

SangamSetu is a digital public infrastructure portal designed for the Government of India (DPIIT & Ministry of Commerce and Industry) to connect Central & State Ministries with verified startups for transparent, milestone-backed innovation procurement under Rule 194 of the General Financial Rules (GFR).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript 5.9 (Strict mode)
- **Styling**: Tailwind CSS v4 & Lucide React
- **Database & Auth**: Firebase (Cloud Firestore with ABAC Security Rules + Firebase Auth)
- **AI Inference**: Google GenAI SDK (`@google/genai`) on server API routes
- **CI / Quality**: ESLint 9 + TypeScript Compiler (`tsc`) + GitHub Actions

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 20+
- npm (version 10+)

### 2. Setup
```bash
# Clone and install dependencies
git clone https://github.com/your-org/sangamsetu.git
cd sangamsetu
npm install

# Setup environment variables
cp .env.example .env.local
```

### 3. Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server on port 3000 |
| `npm run lint` | Runs ESLint across the codebase |
| `npm run typecheck` | Runs TypeScript compiler verification (`tsc --noEmit`) |
| `npm run build` | Produces production-optimized build in `.next/` |
| `npm run start` | Runs production server |
| `npm run clean` | Cleans Next.js cache |

---

## 📁 Repository Structure

```
.
├── .github/workflows/       # GitHub Actions CI workflow (lint, typecheck, build)
├── app/                     # Next.js App Router (pages, layouts, and API routes)
│   ├── api/                 # Server-side API endpoints (/api/gemini/*)
│   ├── dashboard/           # Multi-role role-based dashboard views
│   ├── 9-step-workflow/     # End-to-end statutory procurement lifecycle
│   └── ...                  # Public portal pages (challenges, circulars, legal)
├── components/              # Modular UI components (brand, layout, dashboard)
├── context/                 # Application & Authentication state providers
├── lib/                     # Utilities, Firebase client, security rate-limiters
├── public/                  # Static assets and icons
├── firestore.rules          # Firestore Attribute-Based Access Control (ABAC) rules
├── firebase-blueprint.json  # Data schema specification
├── .env.example             # Environment variable template
└── package.json             # Project dependencies and scripts
```

---

## 🔒 Security & Environment Variables

| Variable | Scope | Description |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Server-only (`process.env`) | API key for server-side proposal evaluation. Never exposed to browser bundles. |
| `APP_URL` | Runtime | Public URL of the deployment. |

- **Security Rules**: Database authorization is enforced server-side via `firestore.rules`.
- **API Protection**: AI evaluation endpoints are rate-limited and origin-checked (`lib/security.ts`).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
