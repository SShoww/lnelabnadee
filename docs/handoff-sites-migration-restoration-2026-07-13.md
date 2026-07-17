# Handoff: Google Sites Migration & Layout Restoration
**Date:** 2026-07-13  
**Topic:** Sites Migration & Correction Loop

---

## 1. Outstanding Objectives
* **Verify Integration Continuously:** Ensure that any future page additions follow the strict zero-modification policy for legacy HTML embeds.
* **Maintain External Link Buttons:** If new external links are discovered, render them cleanly using the `ExternalLinkPanel` layout rather than leaving them as raw text links.

## 2. Work Accomplished
* **Raw HTML Restored:** Extracted the exact, raw HTML from [site_structure_report.md](file:///C:/Users/Windows%2011/.gemini/antigravity-cli/brain/97f298d6-c987-4a1d-8254-c78d48595646/site_structure_report.md) for all EQA, IQC, and RLU dashboard pages. These are saved unmodified in [public/embeds/](file:///D:/nadi%20web/public/embeds/).
* **External Link Buttons Created:** Added [ExternalLinkPanel.jsx](file:///D:/nadi%20web/src/pages/ExternalLinkPanel.jsx) to display descriptions and beautiful action buttons for external links like RISK ([https://nad.thai-nrls.org](https://nad.thai-nrls.org)) and EQA portals ([https://pt.dmsc.moph.go.th/](https://pt.dmsc.moph.go.th/)).
* **Navigation & Routing Integrated:** Fully wired all new subpages into [App.jsx](file:///D:/nadi%20web/src/App.jsx), [DashboardLayout.jsx](file:///D:/nadi%20web/src/components/DashboardLayout.jsx), and [config.json](file:///D:/nadi%20web/src/config/config.json).
* **Headless Verification:** Tested the rendering of the new routes using Puppeteer and saved visual check results under [scratch/](file:///D:/nadi%20web/scratch/).

## 3. Files and Code
* **Modified Files:**
  * [src/App.jsx](file:///D:/nadi%20web/src/App.jsx) - Added routing for all EQA, IQC, and RLU dashboards.
  * [src/components/DashboardLayout.jsx](file:///D:/nadi%20web/src/components/DashboardLayout.jsx) - Updated sidebar navigation sections.
  * [src/components/QualityControlPanel.jsx](file:///D:/nadi%20web/src/components/QualityControlPanel.jsx) - Unified the embed configuration loader map.
  * [src/config/config.json](file:///D:/nadi%20web/src/config/config.json) - Added configuration entries for `eqaEmbeds`, `iqcEmbeds`, and `rluEmbeds`.
* **New Files:**
  * [src/pages/ExternalLinkPanel.jsx](file:///D:/nadi%20web/src/pages/ExternalLinkPanel.jsx) - Action card wrapper component for link-out button dashboards.
  * [public/embeds/](file:///D:/nadi%20web/public/embeds/) - Target destination folder for unmodified Google Sites custom HTML snippets.

## 4. Suggested Skills
* **diagnose** ([SKILL.md](file:///C:/Users/Windows%2011/.gemini/config/skills/diagnose/SKILL.md)) - Activate this if any charts fail to fetch Google Sheets CSV data in the browser environment due to network errors.
* **review** ([SKILL.md](file:///C:/Users/Windows%2011/.gemini/config/skills/review/SKILL.md)) - Use this to audit standard compliance and layout fidelity since last commit.
