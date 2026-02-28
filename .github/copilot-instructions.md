# Wedding Invitation — Copilot Instructions

## Project Overview
Static single-page wedding invitation for **Abin Joseph & Shanthal Denny**. Should have an elegant design, smooth animations, and be mobile-friendly. Should be appropriate for a wedding invitation to family, friends, work colleagues, and acquaintances. No flashy or trendy design elements — aim for timeless elegance. Content is in English only, with no Malayalam text (except for bride and groom name optionally).

## Architecture

### View Routing
URL query parameter `?view=` selects one of four views. No `?view=` shows a landing page with links to all four.

| View key           | Perspective | Shows             |
|--------------------|-------------|-------------------|
| `groom-wedding`    | groom       | Wedding only      |
| `groom-both`       | groom       | Betrothal+Wedding |
| `bride-betrothal`  | bride       | Betrothal only    |
| `bride-both`       | bride       | Betrothal+Wedding |


## Content Rules (Do Not Change Without Permission)
- **English only** — no Malayalam text
- Groom invitation: "Gracy Joseph cordially invites you… her beloved son"
- Bride invitation: "Denny Joseph & Jisha Denny cordially invite you… their beloved daughter"
- Groom compliments: **Alphonsa & Jojo** (primary) + **Anton · Anson** (secondary)
- Bride compliments: **Sharon** (primary)
- Groom phone: +91 94956 72609 | Bride phone: +91 94470 25551
- Betrothal: April 26, 2026, 4:00 PM — Vijnanamatha Church, Thodupuzha → Josh Pavilion Auditorium
- Wedding: May 9, 2026, 11:00 AM — St. Joseph's Church, Kizhathadiyoor → Sunstar Convention Centre, Pala

## Development Patterns
- **No build tools** — edit files directly and open `index.html` in a browser (or use Live Server)..

## Testing
- Use the **Playwright MCP server** to visually verify all four `?view=` variants on both mobile and desktop widths.
- After any UI change, check all four views — content and card order differ per perspective.
- Before making design changes, screenshot the current state to avoid regressions. Keep screenshots in `.playwright-mcp` directory for reference.

## Deployment
GitHub Pages from `main` branch, `/ (root)` directory. No CI — push to `main` deploys automatically.
