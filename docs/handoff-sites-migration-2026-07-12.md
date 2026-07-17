# Handoff: Google Sites to React-Tailwind Migration
**Date:** July 12, 2026
**Topic:** Migration of LNELABNADEE Google Sites to a modern React + Tailwind CSS SPA

---

## 1. Project Context & Objectives
We migrated a 65-page legacy Google Sites portal into a highly optimized, single-page React dashboard styled with Tailwind CSS (v4). The target domain covers laboratory quality systems (EQA, IQC, Sigma metrics) and instrument maintenance checklists.

---

## 2. What Was Accomplished

### A. Site Crawling & Data Recovery
* Connected Puppeteer via debugging port `9222` to bypass Google bot blocks.
* Crawled the Google Sites editor tree by client-side sidebar clicks, expanding folders recursively to map 65 subpages.
* Extracted raw custom HTML code blocks and standard iframes, saving them in [site_structure.json](file:///D:/nadi%20web/archive-old-project/site_structure.json).

### B. New App Architecture
* Scaffolded a clean React project with Vite, Tailwind CSS (v4), React Router, and Lucide Icons.
* **Component Framework:**
  * [ThemeContext.jsx](file:///D:/nadi%20web/src/contexts/ThemeContext.jsx) manages a dark/light theme mode state persisted in `localStorage`.
  * [DashboardLayout.jsx](file:///D:/nadi%20web/src/components/DashboardLayout.jsx) builds a responsive glassmorphic navigation drawer containing all menu trees.
  * [HomePage.jsx](file:///D:/nadi%20web/src/pages/HomePage.jsx) features a clean portal directory with direct routes to category index panels.
  * [QualityControlPanel.jsx](file:///D:/nadi%20web/src/components/QualityControlPanel.jsx) dynamically extracts active routes, binds matching embed files, and renders a secure `<iframe>` with loading spinners and error fallbacks. Preserves the original page headers (centered titles and red underline accent lines).

### C. Embed Data Extraction
* Parsed [site_structure_report.md](file:///C:/Users/Windows%2011/.gemini/antigravity-cli/brain/97f298d6-c987-4a1d-8254-c78d48595646/site_structure_report.md) to isolate all custom HTML widget code blocks.
* Generated 13 standalone `.html` files under [public/embeds/](file:///D:/nadi%20web/public/embeds/) containing the original Chart.js gauges, CSS sheets, and CSV parsers. Multiple widgets on single pages (e.g. `SIGMA CHEMISTRY`) were merged cleanly into a single panel view.
* Mapped `MICROS.KPI` directly to its live Google Apps Script webhook URL to enable online form submissions.
* Standardized routes and assets inside [config.json](file:///D:/nadi%20web/src/config/config.json).

---

## 3. Current Running State
* Development server running locally at: `http://localhost:5173/`
* verified rendering using Puppeteer screenshots:
  * **Home page:** Displays category shortcuts and launcher cards correctly.
  * **Live webhooks:** Standard Google Apps Script widgets load instantly.
  * **Local custom embeds:** Local HTML dashboards load, fetch CSV sheets, and render Chart.js bars and select inputs flawlessly.

---

## 4. Legacy Archive References
All old files, configurations, and crawl notes are saved inside:
* [archive-old-project/](file:///D:/nadi%20web/archive-old-project/)

---

## 5. Next Focus Areas
* **Migrate Other Categories:** Currently, selecting links from the other navigation groups (Quality Work, Maintenance, EQA Programs) displays a "Coming Soon / Under Migration" panel. These need to be migrated in subsequent phases using their respective CSV sources and Apps Script forms.
* **Form Submissions:** Hook up the maintenance checklists (e.g., AutoLumo, CA-620) to send daily log forms to their respective Apps Script webhooks.

---

## 6. Suggested Skills for Next Agent
* `improve-codebase-architecture` (C:\Users\Windows 11\.gemini\config\skills\improve-codebase-architecture\SKILL.md): Invoke this skill when adding more pages (like Maintenance or Quality Work) to maintain clean routes and context.
* `karpathy-guidelines` (C:\Users\Windows 11\.gemini\config\plugins\andrej-karpathy-skills\skills\karpathy-guidelines\SKILL.md): Read this skill before doing further UI updates to avoid overcomplicating components and to write clean, maintainable Tailwind code.
