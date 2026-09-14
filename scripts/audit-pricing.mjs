import {readFileSync, readdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const rates = new Map([[30,80],[45,105],[60,120],[75,170],[90,205],[120,270]]);
const files = [...readdirSync('.').filter(f=>/\.(html|md|txt)$/.test(f)),...readdirSync('blog').filter(f=>/\.(html|md)$/.test(f)).map(f=>'blog/'+f), 'scripts/generate-seo-blog-pages.mjs'];
let offers=0;
function checkSchema(value,file) {
 if (!value || typeof value !== 'object') return;
 if (value['@type']==='Offer' && value.price!==undefined) {
  const duration=(value.name||'').match(/(\d+)[-\s]*minute/i);
  if (duration && rates.has(Number(duration[1]))) {
   const expected=/intro|first|new.client/i.test(value.name)&&Number(duration[1])===60?109:rates.get(Number(duration[1]));
   assert.equal(Number(value.price),expected,`${file}: ${value.name}`);offers++;
  }
 }
 Object.values(value).forEach(v=>Array.isArray(v)?v.forEach(x=>checkSchema(x,file)):checkSchema(v,file));
}
for(const file of files){
 const source=readFileSync(file,'utf8');
 assert(!/\$(?:70|150|174|175|230)(?![\d.])|<sup>\$<\/sup>(?:70|150|174|175|230)\b|"price"\s*:\s*"?(?:70|150|174|175|230)\b/.test(source),`${file}: retired price`);
 if (file.endsWith('.html')) for(const match of source.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g))checkSchema(JSON.parse(match[1]),file);
}
const home=readFileSync('index.html','utf8');
for(const [minutes,price] of rates)assert(home.includes(`<td>${minutes} min</td><td>$${price}</td>`),`Homepage rate: ${minutes} minutes`);
assert(home.includes('id="km-rate">$109</span>'),'Introductory price');
console.log(`PASS: ${files.length} site/source files checked for retired prices; ${offers} structured offers and all seven supplied rates verified.`);
