import { existsSync, readFileSync } from 'node:fs';

const source = readFileSync('llms.txt', 'utf8');
const lines = source.split(/\r?\n/);
const errors = [];

if (!lines[0]?.startsWith('# ')) errors.push('llms.txt must begin with an H1.');
if (!lines.some((line) => line.startsWith('> '))) errors.push('llms.txt needs a blockquote summary.');

let inSection = false;
for (const [index, line] of lines.entries()) {
  if (line.startsWith('## ')) {
    inSection = true;
    continue;
  }
  if (!inSection || !line.trim()) continue;
  if (!/^- \[[^\]]+\]\(https:\/\/[^)]+\)(?:: .+)?$/.test(line)) {
    errors.push(`Line ${index + 1} is not a linked list item inside an H2 section.`);
  }
}

const localLinks = [...source.matchAll(/https:\/\/kimuramassage\.ca\/([^\s)]+)/g)]
  .map((match) => decodeURIComponent(match[1]))
  .map((path) => path || 'index.html');
for (const path of localLinks) {
  const localPath = path.endsWith('/') ? `${path}index.html` : path;
  if (!existsSync(localPath)) errors.push(`Missing local target for https://kimuramassage.ca/${path}`);
}

for (const forbidden of ['relaxation massage from $40', 'WhatsApp', '200+ verified reviews', 'full session fee']) {
  if (source.includes(forbidden)) errors.push(`Outdated or unsupported text remains: ${forbidden}`);
}

for (const required of ['$70 + HST', '$120 + HST', '$150 + HST', '$175 + HST', '$109 + HST', '50%']) {
  if (!source.includes(required)) errors.push(`Required verified fact is missing: ${required}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`llms.txt passed: ${localLinks.length} local targets verified and all H2 sections use linked lists.`);
