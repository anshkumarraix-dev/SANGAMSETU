# SangamSetu (संगमसेतु) — Architecture Specification

## 1. System Topology
- **Framework**: Next.js 15+ App Router with TypeScript.
- **Styling**: Tailwind CSS v4 with GIGW 3.0 (Guidelines for Indian Government Websites) accessibility standards and high-contrast styling.
- **Iconography**: `lucide-react` with official Devanagari script elements.
- **Persistence & State**: Firebase Firestore with multi-role authentication (Startup, Government, Testing Org, Admin/DPIIT).
- **Navigation Invariant**: Every navigation link, footer item, and statutory reference must be a real, crawlable, server-rendered Next.js route (`<Link href="...">`). Zero blank pages or `#` placeholders permitted.

## 2. Information Architecture & Routes
- `/` — Homepage with Statutory Identity, Challenge Spotlight, 9-Step Process Summary, Live Impact Metrics, Success Highlights.
- `/challenges` — Comprehensive Problem & Challenge Browser with Search, Ministry Filters, Budget Selectors, G1/G2 Tier Filters, and Interactive Modal.
- `/9-step-workflow` — Full 9-Step Statutory Innovation Procurement Lifecycle with GFR 2017 & GeM policy references.
- `/pilot-outcomes` — Verified Pilot Success Stories with Cost Savings, Scaling Metrics, and Direct GeM Transition Case Studies.
- `/guidelines` — Statutory Guidelines, GFR 2017 Rules 149 & 161(iv), Make in India Compliance, Lab Benchmarking Norms.
- `/circulars` — Official Ministry Circulars, Office Memorandums, Gazette Notifications, PDF repository.
- `/dashboard` — Multi-Role Operational Workspace (Startup, Government, Testing Lab, DPIIT Mission Control).
- `/governance/rti` — Right to Information Act 2005 Portal, CPIO/Appellate details, RTI application norms.
- `/governance/cpgrams` — Centralized Public Grievance Redress and Monitoring System (CPGRAMS) Integration.
- `/governance/startup-exemptions` — Detailed Statutory Exemption Norms for DPIIT Startups.
- `/faq` — Categorized Frequently Asked Questions for Startups, Ministries, and Labs.
- `/sitemap` — Comprehensive Portal Sitemap linking to all public and statutory resources.
- `/legal/privacy-policy` — Government of India Privacy Policy & Data Residency Statement.
- `/legal/terms` — Terms of Service & Portal Usage Norms.
- `/legal/copyright` — Government Copyright Policy & Open Data License.
- `/legal/hyperlinking` — Hyperlinking Policy for .gov.in and external portals.
- `/legal/disclaimer` — Legal Disclaimer & Statutory Disclosures.
- `/legal/accessibility` — GIGW 3.0 Accessibility Statement & WCAG 2.1 AA Compliance.
- `/forgot-password` — Multi-Tier Password Recovery & Nodal Helpdesk OTP verification.
- `/login` — Multi-Role Verified Portal Sign-In.
- `/register` — Multi-Role DPIIT / Udyam / STQC Registration with CAPTCHA and Terms consent.
