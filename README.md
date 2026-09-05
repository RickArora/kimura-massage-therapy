# Kimura Massage Therapy & Rehab

Live site: https://kimuramassage.com/

Static RMT clinic website. Cloudflare Workers Builds publishes the `main` branch. GitHub Pages also builds `main` as a secondary preview.

## Local preview

`python3 -m http.server 8086 --bind 127.0.0.1`

## Validation

- `node scripts/audit-site.mjs` checks all public HTML, local links and anchors, JSON-LD, scripts, navigation, and retired booking copy.
- `node scripts/audit-seo-blog-pages.mjs` checks the occupation guide library and sitemap.
- `node scripts/audit-llms.mjs` checks machine-readable clinic information.
- `node scripts/test-site-behavior.mjs` checks booking selection and tracking. Guide filtering, navigation, and responsive layouts were also verified in the browser.

## Shared design

`scripts/site-shell.mjs` owns the shared header, footer, booking destinations, and release version. Run `node scripts/refresh-site.mjs` after editing the shared shell. The article generator reapplies it automatically. Shared styling and interactions are in `assets/site.css` and `assets/site.js`; homepage/offer styling is in `assets/home.css`. `assets/booking.js` keeps generic booking controls synchronized with the first/returning choice for the current browser tab. Explicit first-visit and returning links retain their labeled destinations.

## Booking and analytics

Prices were checked against the public Noterro booking pages on September 4, 2026. The clinic website links directly to initial or returning appointments; duration selection remains in Noterro. Never invent duration URL parameters.

GA4 booking-link and phone-link events measure intent, not completed appointments. The existing Google Ads click action is retained for continuity and is explicitly labeled as a legacy intent signal. Confirmed and attended appointment reporting requires a supported Noterro integration or verified offline conversion process; do not count site clicks as booked revenue.
