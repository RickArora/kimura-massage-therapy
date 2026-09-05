import {readFileSync, writeFileSync, readdirSync} from 'node:fs';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {siteHeader, siteFooter, bookingDock, initialBooking, release} from './site-shell.mjs';

function removeDiv(html, className) {
  const startPattern = new RegExp(`<div\\b[^>]*class="[^"\\n]*\\b${className}\\b[^"\\n]*"[^>]*>`, 'i');
  let match;
  while ((match = html.match(startPattern))) {
    const start = match.index;
    const tags = /<\/?div\b[^>]*>/gi;
    tags.lastIndex = start;
    let depth = 0, end = start;
    for (let tag; (tag = tags.exec(html));) {
      depth += tag[0].startsWith('</') ? -1 : 1;
      if (!depth) { end = tags.lastIndex; break; }
    }
    if (end === start) break;
    html = html.slice(0, start) + html.slice(end);
  }
  return html;
}

export function refreshHtml(source, file) {
  const prefix = file === '404.html' ? '/' : dirname(file) === '.' ? './' : '../';
  let html = source.replaceAll('kimuramassage.' + 'ca', 'kimuramassage.com');
  html = html.replace(/\$70(?!\d)/g, '$80').replace(/(<sup>\$<\/sup>)70\b/g, (_, symbol) => symbol + '80');
  html = html.replaceAll('"Mississauga""', '"Mississauga"');
  html = html.replace(/Save 10%/g, 'Save $11');
  html = html.replace(/Same-day appointments available today/gi, 'Check current appointment availability');
  html = html.replace(/Same-day appointments available(?!\s+(?:most|when|if|subject))/gi, 'Same-day appointments may be available');
  html = html.replace(/Same-day availability most days/gi, 'Check the booking calendar for availability');
  html = html.replace(/Same-day appointments most days/gi, 'See current availability online');
  html = html.replace(/Same-day available\.?/gi, 'View available times.');
  html = html.replace(/no account (?:needed|required)/gi, 'secure booking via Noterro');
  html = html.replace(/Book (?:Online|Now)(?:\s*→)?(<\/a>)/g, 'Book a first visit$1');
  html = html.replace(/href="https:\/\/kimuramassage\.noterro\.com\/(?:service-category\/59418\/Appointments)?"/g, `href="${initialBooking}"`);
  html = html.replace(/<script\b[^>]*src="[^"]*(?:intro-popup|mobile-ux)\.js[^"\n]*"[^>]*>\s*<\/script>/gi, '');
  html = html.replace(/<script\b(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi, (full, code) => /getElementById\(['"](?:hamburger|stickyBar)['"]\)/.test(code) ? '' : full);
  for (const oldClass of ['mobile-nav', 'sticky-book-bar', 'site-mobile-cta', 'booking-dock']) html = removeDiv(html, oldClass);
  html = html.replace(/<header\b[^>]*>[\s\S]*?<\/header>/i, siteHeader(prefix));
  html = html.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/i, siteFooter(prefix));
  if (!/<main\b/i.test(html)) {
    html = html.replace('</header>', '</header>\n<main id="main-content">').replace('<footer ', '</main>\n<footer ');
  }
  html = html.replace(/<main id="main">/g, '<main id="main-content">').replace('href="#main"', 'href="#main-content"');
  if (!/class="skip-link"/.test(html)) html = html.replace(/<body[^>]*>/i, '$&\n<a class="skip-link" href="#main-content">Skip to main content</a>');
  // Relative public paths work on both the custom domain and the GitHub Pages preview.
  html = html.replace(/(href|src)="\/(?!\/)([^"\n]*)"/g, (_, attr, path) => `${attr}="${prefix}${path}"`);
  html = html.replace(/<link\b[^>]*href="[^"]*assets\/site\.css[^"\n]*"[^>]*>/gi, '');
  html = html.replace(/<script\b[^>]*src="[^"]*assets\/site\.js[^"\n]*"[^>]*>\s*<\/script>/gi, '');
  html = html.replace(/(href="[^"\n]*style\.css)(?:\?[^"\n]*)?"/g, `$1?v=${release}"`);
  html = html.replace(/(src="[^"\n]*assets\/analytics\.js)(?:\?[^"\n]*)?"/g, `$1?v=${release}"`);
  if (!html.includes('assets/analytics.js')) html = html.replace('</head>', `<script src="${prefix}assets/analytics.js?v=${release}" defer></script>\n</head>`);
  html = html.replace(/<script\b[^>]*src="[^"]*assets\/(?:home|booking)\.js[^"\n]*"[^>]*>\s*<\/script>/gi, '');
  html = html.replace(/(href="[^"\n]*assets\/home\.css)(?:\?[^"\n]*)?"/g, `$1?v=${release}"`);
  html = html.replace('</head>', `<script src="${prefix}assets/booking.js?v=${release}" defer></script><link rel="stylesheet" href="${prefix}assets/site.css?v=${release}"><script src="${prefix}assets/site.js?v=${release}" defer></script>\n</head>`);
  html = html.replace('</body>', bookingDock() + '\n</body>');
  if (file === 'blog/index.html' && !html.includes('id="guide-search"')) {
    html = html.replace('<section class="blog-listing">', `<section class="guide-search"><div class="container"><label for="guide-search">Find a guide by topic or occupation</label><input id="guide-search" type="search" placeholder="Try neck tension, insurance, or software developer" autocomplete="off" aria-describedby="guide-search-status"><p id="guide-search-status" role="status" aria-live="polite">Browse by topic below, or search for a specific concern or occupation.</p></div></section>\n<section class="blog-listing">`);
  }
  if (file === 'blog/index.html') {
    if (!html.includes('guide-categories')) html = html.replace('<p id="guide-search-status"', '<div class="guide-categories" role="group" aria-label="Filter guides by topic" hidden><button type="button" data-guide-category="all" aria-pressed="true">All topics</button><button type="button" data-guide-category="pain" aria-pressed="false">Pain &amp; tension</button><button type="button" data-guide-category="training" aria-pressed="false">Training</button><button type="button" data-guide-category="first" aria-pressed="false">First visit</button><button type="button" data-guide-category="insurance" aria-pressed="false">Insurance</button><button type="button" id="guide-reset">Clear filters</button></div><p id="guide-search-status"');
    html = html.replace(/<section class="content-section[^"\n]*"[^>]*>[\s\S]*?<\/section>/g, section => {
      if (!section.includes('seo-link-list') || section.includes('class="guide-library"')) return section;
      section = section.replace(/<div class="blog-listing-header">([\s\S]*?)<\/div>/, (_, header) => {
        const title = header.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1] || 'More guides';
        return `<details class="guide-library"><summary>${title}</summary>`;
      });
      return section.replace(/<\/div>\s*<\/section>$/, '</details></div></section>');
    });
  }
  html = html.replace('width=device-width,initial-scale=1"', 'width=device-width,initial-scale=1,viewport-fit=cover"').replace('width=device-width, initial-scale=1.0"', 'width=device-width, initial-scale=1.0, viewport-fit=cover"');
  return html.replace(/[ \t]+$/gm, '');
}

export function refreshSite() {
  const internal = new Set(['color-mockups.html', 'favicon-preview.html', 'kimura-redesign-mockup.html']);
  const files = [...readdirSync('.').filter(file => file.endsWith('.html') && file !== '404.html'), ...readdirSync('blog').filter(file => file.endsWith('.html')).map(file => `blog/${file}`)];
  let changed = 0;
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    const next = internal.has(file) ? source.replaceAll('kimuramassage.com', 'kimuramassage.com').replace('</head>', source.includes('name="robots"') ? '</head>' : '<meta name="robots" content="noindex,follow">\n</head>') : refreshHtml(source, file);
    if (source !== next) { writeFileSync(file, next); changed++; }
  }
  console.log(`Refreshed shared design, booking paths, pricing, and metadata across ${changed} pages.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) refreshSite();
