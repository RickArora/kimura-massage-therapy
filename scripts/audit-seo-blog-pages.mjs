import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';

const blogDir = 'blog';
const site = 'https://kimuramassage.ca';
const errors = [];
const warnings = [];

const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);
const matchOne = (html, pattern) => html.match(pattern)?.[1]?.trim() || '';
const stripHtml = (html) => html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z0-9#]+;/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const files = readdirSync(blogDir).filter((file) => file.endsWith('.html'));
const occupationFiles = files.filter((file) => file.startsWith('work-recovery-guide-'));
const sitemap = readFileSync('sitemap.xml', 'utf8');
const index = readFileSync(join(blogDir, 'index.html'), 'utf8');
const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapSet = new Set(sitemapLocs);
const titles = new Map();
const descriptions = new Map();

if (occupationFiles.length !== 854) fail(`Expected 854 canonical occupation guides; found ${occupationFiles.length}.`);

for (const file of occupationFiles) {
  const path = join(blogDir, file);
  const html = readFileSync(path, 'utf8');
  const expectedUrl = `${site}/blog/${file}`;
  const title = matchOne(html, /<title>([^<]+)<\/title>/i);
  const description = matchOne(html, /<meta name="description" content="([^"]+)"/i);
  const canonical = matchOne(html, /<link rel="canonical" href="([^"]+)"/i);
  const article = matchOne(html, /<article class="article-body">([\s\S]*?)<\/article>/i);
  const wordCount = stripHtml(article).split(/\s+/).filter(Boolean).length;
  const h1Count = (html.match(/<h1\b/gi) || []).length;

  if (!title) fail(`${file}: missing title.`);
  if (!description || description.length < 70 || description.length > 170) fail(`${file}: meta description length is ${description.length}.`);
  if (canonical !== expectedUrl) fail(`${file}: canonical does not match its URL.`);
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) fail(`${file}: canonical guide is noindex.`);
  if (h1Count !== 1) fail(`${file}: expected one H1; found ${h1Count}.`);
  if (wordCount < 650) fail(`${file}: article body has only ${wordCount} words.`);
  if (!html.includes('"@type": "Article"') || !html.includes('"@type": "BreadcrumbList"')) fail(`${file}: required Article or Breadcrumb schema is missing.`);
  if (html.includes('"@type": "FAQPage"')) fail(`${file}: contains FAQ schema without a visible FAQ section.`);
  if (!sitemapSet.has(expectedUrl)) fail(`${file}: missing from sitemap.`);
  if (!index.includes(`/blog/${file}`)) fail(`${file}: missing from occupation library.`);
  if (/adult massage|erotic massage|happy ending|sensual massage|sexual massage/i.test(html)) fail(`${file}: contains prohibited sexual massage wording.`);

  if (titles.has(title)) fail(`${file}: duplicate title with ${titles.get(title)}.`);
  else titles.set(title, file);
  if (descriptions.has(description)) fail(`${file}: duplicate meta description with ${descriptions.get(description)}.`);
  else descriptions.set(description, file);

  for (const href of html.matchAll(/href="\/blog\/(work-recovery-guide-[^"?#]+\.html)/g)) {
    if (!existsSync(join(blogDir, href[1]))) fail(`${file}: broken related-guide link to ${href[1]}.`);
  }

  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(block[1]); } catch { fail(`${file}: invalid JSON-LD.`); }
  }

  if (title.length > 90) warn(`${file}: long title (${title.length} characters).`);
}

const csv = readFileSync('scripts/seo-job-titles.csv', 'utf8');
const csvLines = csv.trim().split(/\r?\n/);
if (csvLines.length !== 4001) fail(`Expected 4,000 source job titles; found ${csvLines.length - 1}.`);

const referenceFiles = files.filter((file) => file.startsWith('massage-for-'));
let referencePages = 0;
for (const file of referenceFiles) {
  const html = readFileSync(join(blogDir, file), 'utf8');
  if (!html.includes('<span class="post-tag">Job Recovery Guide</span>')) continue;
  referencePages += 1;
  const canonical = matchOne(html, /<link rel="canonical" href="([^"]+)"/i);
  if (!/<meta name="robots" content="noindex,follow"/i.test(html)) fail(`${file}: job-title reference page is indexable.`);
  if (!canonical.includes('/blog/work-recovery-guide-')) fail(`${file}: reference canonical does not point to an occupation guide.`);
  if (!existsSync(join(blogDir, basename(canonical)))) fail(`${file}: canonical occupation guide is missing.`);
  if (sitemapSet.has(`${site}/blog/${file}`)) fail(`${file}: noindex reference page appears in sitemap.`);
}
if (referencePages !== 4000) fail(`Expected 4,000 job-title reference pages; found ${referencePages}.`);

if ((index.match(/work-recovery-guide-/g) || []).length !== occupationFiles.length) {
  fail('Occupation-library link count does not match canonical guide count.');
}

console.log(`SEO audit: ${occupationFiles.length} canonical occupation guides, ${referencePages} job-title reference pages, ${sitemapLocs.length} sitemap URLs.`);
console.log(`Unique occupation titles: ${titles.size}; unique descriptions: ${descriptions.size}.`);
if (warnings.length) console.log(`Warnings: ${warnings.length} (${warnings.slice(0, 3).join(' | ')}${warnings.length > 3 ? ' | ...' : ''})`);
if (errors.length) {
  console.error(`FAILED with ${errors.length} issue(s):`);
  for (const error of errors.slice(0, 50)) console.error(`- ${error}`);
  if (errors.length > 50) console.error(`- ...and ${errors.length - 50} more.`);
  process.exit(1);
}
console.log('PASS: indexability, canonicalization, on-page metadata, schema, content depth, internal links, and non-sexual content checks passed.');
