# Domain Glossary - LNELABNADEE Portal

This document defines the canonical terms used across the lab portal migration and restoration efforts.

### Raw HTML Embed
An unmodified legacy HTML code block extracted directly from the crawled Google Sites editor source. It contains original inline scripts, styles, and SVG or canvas elements.

### Combined Embed
A single HTML asset created by concatenating multiple sequential Raw HTML Embeds from the same subpage, separated by `<!-- EMBED DIVISION -->` tags.

### External Link Button
A clean UI dashboard action card wrapping an external URL, replacing raw floating links with styled action items.

### AppsScript Double-Experience Panel
A premium dual-experience UI container rendered when an embed URL targets `script.google.com`. It features: (1) a Thai-language explanation of browser security or Google account conflict causes, (2) an external CTA button that opens the script in a new tab, (3) a collapsible accordion detailing backend fix steps (HtmlService ALLOWALL) and deployment guides, and (4) the live iframe rendered directly underneath so authenticated/unconflicted users can still interact inline.

### Drive Folder Grid
A teal-accented CSS grid panel rendered below the page header on EQA pages. Each cell is a `target="_blank"` link to a Google Drive folder containing official EQA report PDFs. Configured via the `driveLinks` array in `config.json`. Distinct from **Action Chips** — these are strictly folder URLs, never spreadsheet CSV or sheet data links.

### EQA External Portals Page
A centralized dashboard page `/performance/eqa-portals` containing a stylized card grid of external EQA registration and logging systems (e.g., Mahidol EQA, DMSC EQA, WEWED EQA). Designed using glassmorphism cards and medical-teal accents with direct call-to-action buttons opening in a new tab.


