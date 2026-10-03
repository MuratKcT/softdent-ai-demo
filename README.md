# SoftDent · AI demo

Interactive presentation of four AI tools for patients of [SoftDent](https://www.softdent.com.pl/) (Warsaw, Ochota). Polish and English.

| Page | What it does |
|---|---|
| `/` | Overview / pitch |
| `/umi/` | Photo or X-ray pre-assessment: condition, unit prices, matching dentist |
| `/zara/` | Smile design: before/after visualisation, plan, prices |
| `/kalkulator/` | Treatment cost builder based on the SoftDent price list |
| `/asystent/` | Contact page with an AI chat assistant and FAQ |

## Structure

```
assets/data.js    clinic data: address, hours, team, price list (single source of truth)
assets/sd.css     design system (SoftDent colours and typography)
assets/sd.js      i18n (PL/EN), header/footer, API helper, price formatting
assets/config.js  AI endpoint base URL — empty = built-in demo mode
```

## Modes

- **Demo mode** (default): no network calls, canned answers built from `data.js`.
- **Live mode**: set `window.SD_API_BASE` in `assets/config.js` to the public webhook base.
  For local testing only: `localStorage.sd_api = '<base url>'` in the browser console. `?api=off` forces demo mode.

Endpoints expected under the base: `sd-umi`, `sd-zara`, `sd-asystent` (POST, JSON).

## Run locally

```bash
python -m http.server 8765
```

Not the official clinic website. `noindex` on every page.
