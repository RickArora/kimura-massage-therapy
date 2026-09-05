import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {resolve, dirname, relative} from 'node:path';
import vm from 'node:vm';

const root = resolve('.');
const internal = new Set(['color-mockups.html', 'favicon-preview.html', 'kimura-redesign-mockup.html']);
const files = [...readdirSync('.').filter(f => f.endsWith('.html')), ...readdirSync('blog').filter(f => f.endsWith('.html')).map(f => `blog/${f}`)];
const docs = new Map();
const errors = [];
const issue = (file, message) => errors.push(`${file}: ${message}`);
const attrs = text => Object.fromEntries([...text.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m => [m[1], m[2].replaceAll('&amp;', '&')]));
let links = 0, schemas = 0;

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"\n]+)"/g)].map(m => m[1]);
  docs.set(file, {html, ids: new Set(ids)});
  if (internal.has(file)) continue;
  if (!/<html\b[^>]*lang="en(?:-CA)?"/i.test(html)) issue(file, 'missing English document language');
  if ((html.match(/<h1\b/gi) || []).length !== 1) issue(file, 'expected one H1');
  if ((html.match(/<main\b/gi) || []).length !== 1 || (html.match(/<\/main>/gi) || []).length !== 1) issue(file, 'expected one main landmark');
  if (ids.length !== new Set(ids).size) issue(file, 'duplicate element IDs');
  if (!/<meta name="viewport"/.test(html)) issue(file, 'missing viewport metadata');
  if (file !== '404.html' && !/rel="canonical" href="https:\/\/kimuramassage\.com\//.test(html)) issue(file, 'missing correct-domain canonical');
  if (/kimuramassage\.ca\b/.test(html)) issue(file, 'old domain remains');
  if (/\$70(?!\d)|<sup>\$<\/sup>70\b/.test(html)) issue(file, 'outdated $70 rate remains');
  if (/intro-popup\.js|No thanks, I.ll pay full price|Save 10%|getElementById\(['"]hamburger['"]\)/.test(html)) issue(file, 'retired popup, misleading discount, or old navigation remains');
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const a = attrs(match[1]);
    if (a.type === 'application/ld+json') {
      schemas++;
      try { JSON.parse(match[2]); } catch (error) { issue(file, `invalid structured data: ${error.message.slice(0,90)}`); }
    } else if (!a.src && a.type !== 'module' && match[2].trim()) {
      try { new vm.Script(match[2]); } catch (error) { issue(file, `invalid inline JavaScript: ${error.message}`); }
    }
  }
  if (!html.includes('assets/site.css') || !html.includes('assets/site.js')) issue(file, 'shared design or navigation missing');
}

for (const [file, {html}] of docs) {
  if (internal.has(file)) continue;
  const tags = [...html.matchAll(/<(a|link|img|script)\b([^>]*)>/gi)];
  for (const tag of tags) {
    const a = attrs(tag[2]);
    const value = a.href || a.src;
    if (!value || /^(?:tel:|mailto:|data:|javascript:)/.test(value)) continue;
    let url;
    try { url = new URL(value, `https://kimuramassage.com/${file === 'index.html' ? '' : file}`); } catch { issue(file, `malformed URL ${value}`); continue; }
    if (url.hostname !== 'kimuramassage.com') continue;
    links++;
    let target = decodeURIComponent(url.pathname).replace(/^\//,'');
    if (!target || target.endsWith('/')) target += 'index.html';
    const absolute = resolve(root, target);
    if (!absolute.startsWith(root + '/') || !existsSync(absolute)) { issue(file, `missing internal target ${value}`); continue; }
    if (statSync(absolute).isDirectory()) target += '/index.html';
    if (url.hash && docs.has(target) && !docs.get(target).ids.has(decodeURIComponent(url.hash.slice(1)))) issue(file, `missing anchor ${value}`);
    if (tag[1].toLowerCase() === 'img' && !('alt' in a)) issue(file, 'image without alternative text');
  }
}

for (const file of ['assets/site.js', 'assets/home.js', 'assets/analytics.js']) {
  try { new vm.Script(readFileSync(file, 'utf8')); } catch(error) { issue(file, error.message); }
}
console.log(`Checked ${files.length} HTML pages, ${links} internal references, ${schemas} structured-data blocks, and shared JavaScript.`);
if (errors.length) {
  console.error(`${errors.length} issue(s). First 70:`);
  errors.slice(0,70).forEach(error => console.error(error));
  const summary = new Map();
  errors.forEach(error => { const key = error.slice(error.indexOf(':') + 2); summary.set(key, (summary.get(key)||0)+1); });
  console.error('Issue categories:', JSON.stringify([...summary].sort((a,b)=>b[1]-a[1]).slice(0,30)));
  process.exit(1);
}
console.log('PASS: all checked pages, links, anchors, metadata, scripts, and booking content.');
