# Handoff: Quality Work & Maintenance Pages Migration
**Date:** July 12, 2026  
**Topic:** Migration of Quality Work (satisfaction, workload, comparison, consult, TAT) and Maintenance instrument checklist forms into the React + Tailwind SPA (LNELABNADEE Portal v2.0)

---

## 1. What Was Done This Session

### Prior state (from previous handoff)
See [`docs/handoff-sites-migration-2026-07-12.md`](./handoff-sites-migration-2026-07-12.md) for full context.  
At the start of this session, all Quality Work and Maintenance routes displayed a "Coming Soon" placeholder.

### A. Quality Work — now live

| Page | Route | Implementation |
|------|-------|----------------|
| แบบสอบถามความพึงพอใจ | `/quality-work/satisfaction` | `SatisfactionPanel.jsx` — fetches 5 CSV Google Sheets, parses client-side, renders per-group score bars |
| Work Load | `/quality-work/workload` | `QualityControlPanel` iframe (gviz chart embed) |
| Comparison Test | `/quality-work/comparison` | `QualityControlPanel` iframe (gviz chart embed) |
| บันทึกให้คำปรึกษา | `/quality-work/consult` | `QualityControlPanel` iframe (Apps Script embed) |
| Turn Around Time | `/quality-work/tat` | `QualityControlPanel` iframe (gviz chart embed) |

### B. Maintenance — now live (5 instruments)

All 5 instruments have a daily checklist form that POSTs to their respective Apps Script webhooks (no-cors mode):

| Device | Route | Webhook key |
|--------|-------|-------------|
| AutoLumo | `/maintenance/autolumo` | `m-autolumo` |
| CA-620 | `/maintenance/ca-620` | `m-ca620` |
| Vitross 4600 | `/maintenance/vitross-4600` | `m-vitross4600` |
| BC 6200 | `/maintenance/bc-6200` | `m-bc6200` |
| FUS1000 | `/maintenance/fus1000` | `m-fus1000` |

Each form collects: technician name, date/time (auto), per-item checkboxes (instrument-type-specific), remarks. On submit it POSTs to the webhook and shows a success state with a reset button.

---

## 2. Files Changed / Created

| File | Change |
|------|--------|
| `src/config/config.json` | Added `qualityWorkEmbeds`, `satisfactionCsvs`, `maintenanceDevices` sections |
| `src/App.jsx` | Replaced all Quality Work and Maintenance `ComingSoon` routes with real components |
| `src/components/QualityControlPanel.jsx` | Merges `crawledEmbeds` + `qualityWorkEmbeds` so both are accessible by `pageId` |
| `src/components/DashboardLayout.jsx` | Maintenance sidebar links now driven by `config.maintenanceDevices` (single source of truth) |
| `src/pages/SatisfactionPanel.jsx` | **New** — CSV-fetching satisfaction dashboard |
| `src/pages/MaintenanceForm.jsx` | **New** — per-instrument checklist + webhook POST form |

---

## 3. Current Running State

- Dev server: `http://localhost:5174/` (port 5173 was in use)
- All Quality Work and Maintenance pages render without errors
- Satisfaction dashboard shows live response counts (28 doctor, 189 nurse, 103 staff, 415 patient, 47 hstaff)
- Maintenance forms display instrument-type-specific checklists and submit button

---

## 4. Still "Coming Soon" / Not Yet Migrated

| Route | Reason |
|-------|--------|
| `/quality-work/risk` | No data source or embed URL found in config — needs source from legacy site |
| `/quality-control/eqa` | Planned for a future phase per original handoff |
| `/quality-control/iqc` | Planned for a future phase per original handoff |

---

## 5. Architecture Notes

- **`config.json` is the single source of truth** for all routes, embed URLs, CSV URLs, webhook URLs, and device metadata. Add new items there before creating components.
- **`QualityControlPanel`** is a generic iframe panel — any URL that can be embedded (gviz, Apps Script exec, local `/embeds/*.html`) goes through it. No new panel component needed for simple embeds.
- **`MaintenanceForm` checklists** are hardcoded by `device.type` string (e.g. `"Chemistry Analyzer"`). To add items, edit the `CHECKLISTS` map in `src/pages/MaintenanceForm.jsx`. YAGNI to make them config-driven unless the structure changes frequently.
- **Satisfaction CSVs** are public Google Sheets exports (`?output=csv`). They are parsed with a minimal inline parser — no library. Score column detection is numeric-value-based (checks `parseFloat`).
- Webhook POST uses `mode: 'no-cors'` — the response is opaque. A successful submit sets status to `'success'` unconditionally (Apps Script does not return CORS headers, but the POST does reach the sheet).

---

## 6. Legacy Archive Reference

All crawled data and old project files remain in:  
`D:\nadi web\archive-old-project\`

Embed HTML files are in:  
`D:\nadi web\public\embeds\` (13 files, all working)

---

## 7. Suggested Skills for Next Agent

- **`improve-codebase-architecture`** (`C:\Users\Windows 11\.gemini\config\skills\improve-codebase-architecture\SKILL.md`): Invoke before adding EQA or IQC pages to keep route and component structure clean.
- **`karpathy-guidelines`** (`C:\Users\Windows 11\.gemini\config\plugins\andrej-karpathy-skills\skills\karpathy-guidelines\SKILL.md`): Read before any further UI work to avoid over-engineering components.
- **`ponytail`** (`C:\Users\Windows 11\.gemini\config\plugins\ponytail\skills\ponytail\SKILL.md`): Session was run in `full` ponytail mode — invoke `/ponytail full` to continue in the same discipline.
- **`tdd`** (`C:\Users\Windows 11\.gemini\config\skills\tdd\SKILL.md`): Consider for the RISK page or IQC integration, which will need data-fetching logic that benefits from test coverage.
